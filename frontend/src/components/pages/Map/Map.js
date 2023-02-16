import React from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
mapboxgl.accessToken = "pk.eyJ1IjoibGF6eWdob3N0IiwiYSI6ImNsY293dHF1dzAydHEzc2xyMjUwczBuMW4ifQ.atwKqBdRVNLk_saQmszluQ";

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //     latitude: this.props.current_location.latitude,
    //     longitude: this.props.current_location.longitude,
    // }
  }

  componentDidMount() {
    // console.log(this.state);

    const features = [];
    this.props?.warehouseInfo.map((el, ind) => {
      if (el.lng && el.lat) {
        const tepObj = {
          type: "Feature",
          properties: {
            description:
              '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
            icon: "theatre",
          },
          geometry: {
            type: "Point",
            coordinates: [parseFloat(el.lng), parseFloat(el.lat)],
          },
        }
        features.push(tepObj);
      }
    });

    const { lng, lat, zoom } = {
      lng: 77,
      lat: 28,
      zoom: 4,
    };

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });
    map.addControl(
      directions,
      "top-left"
    );

    // directions

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })

    );

    // const lati = this.state.latitude;
    // const longi = this.state.longitude;
    // map.on('load', function (e) {
    //     map.addSource("places", {
    //       // This GeoJSON contains features that include an "icon"
    //       // property. The value of the "icon" property corresponds
    //       // to an image in the Mapbox Streets style's sprite.
    //       type: "geojson",
    //       data: {
    //         type: "FeatureCollection",
    //         features: features,
    //       },
    //     });
    //     // // Add a layer showing the places.
    //     map.addLayer({
    //       id: "places",
    //       type: "circle",
    //       source: "places",
    //       paint: {
    //         "circle-stroke-color": "red",
    //         "circle-stroke-width": 3,
    //         "circle-color": "red",
    //       },
    //     });


    //       // When a click event occurs on a feature in the places layer, open a popup at the
    //       // location of the feature, with description HTML from its properties.
    //       map.on("click", "places", (e) => {
    //         // Copy coordinates array.
    //         const coordinates = e.features[0].geometry.coordinates.slice();
    //         const description = e.features[0].properties.description;

    //         // Ensure that if the map is zoomed out such that multiple
    //         // copies of the feature are visible, the popup appears
    //         // over the copy being pointed to.
    //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //           coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //         }

    //         new mapboxgl.Popup()
    //           .setLngLat(coordinates)
    //           .setHTML(description)
    //           .addTo(map);
    //       });

    //       // Change the cursor to a pointer when the mouse is over the places layer.
    //       map.on("mousemove", "places", () => {
    //         map.getCanvas().style.cursor = "pointer";
    //       });

    //       // Change it back to a pointer when it leaves.
    //       map.on("mouseleave", "places", () => {
    //         map.getCanvas().style.cursor = "";
    //       });

    //     // directions.setOrigin([longi, lati]); // can be address in form setOrigin("12, Elm Street, NY")
    //     // directions.setDestination("Rose 101, Green Fields, Sector 42, Faridabad"); // can be address
    // })
    map.on('load', () => {
      // Add an image to use as a custom marker
      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          map.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': features,
            }
          });

          // Add a symbol layer
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });
        }
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <>
        <div
          ref={(el) => (this.mapContainer = el)}
          className="map-wrapper"
          style={{
            position: "absolute",
            zIndex: 1,
            top: "0px",
            bottom: "0px",
            left: "0px",
            right: "0px",
            display: "flex",
          }}
        />
      </>
    );
  }
}
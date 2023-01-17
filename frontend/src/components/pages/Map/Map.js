import React from "react";

import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
mapboxgl.accessToken = "pk.eyJ1IjoibGF6eWdob3N0IiwiYSI6ImNsY293dHF1dzAydHEzc2xyMjUwczBuMW4ifQ.atwKqBdRVNLk_saQmszluQ";

export default class Map extends React.Component {
  componentDidMount() {
    const { lng, lat, zoom } = {
      lng: 75,
      lat: 31,
      zoom: 10,
    };

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom,
    });

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      }),
      "top-left"
    );
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
  }

  render() {
    return (
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
    );
  }
}
import React from "react";

import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
mapboxgl.accessToken = "pk.eyJ1IjoibGF6eWdob3N0IiwiYSI6ImNsY293dHF1dzAydHEzc2xyMjUwczBuMW4ifQ.atwKqBdRVNLk_saQmszluQ";

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: this.props.current_location.latitude,
            longitude: this.props.current_location.longitude,
        }
    }

    componentDidMount() {
        console.log(this.state);
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

        const lati = this.state.latitude;
        const longi = this.state.longitude;
        map.on('load', function (e) {
            directions.setOrigin([longi, lati]); // can be address in form setOrigin("12, Elm Street, NY")
            directions.setDestination([77, 12]); // can be address
        })
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
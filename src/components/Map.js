import React, { Component } from 'react'
import MapboxGL from 'mapbox-gl'

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_url: 'https://data.edmonton.ca/resource/87ck-293k.json',
            map: false,
            viewport: {
                zoom: 10,
                center: [-113.4909, 53.5444]
            },
            data: null
        };

    }

    componentDidMount() {
        const { data, api_url } = this.state;

        if (!data) {
            fetch(api_url, { method: 'GET' })
                .then(response => response.json())
                .then(response => this.createFeatureCollect(response))
                .then(response => this.setState({ data: response }));
        }
    }

    createFeatureCollect(data) {
        let features = [];
        data.forEach(point => {
            features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinate": [
                        parseFloat(point.location.longitude),
                        parseFloat(point.location.latitude),
                    ]
                },
                "properties": {
                    "description": point.description,
                    "details": point.details,
                    "duration": point.duration,
                    "impact": point.impact
                }
            });
        });

        return {
            "type": "FeatureCollection",
            "features": features
        }
    }

    initializeMap() {
        MapboxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        let map = new MapboxGL.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v9',
            ... this.state.viewport,
        });

        map.on('load', () => {
            map.addLayer({
                'id': 'points',
                'type': 'circle',
                'source': {
                    "type": 'geojson',
                    "data": this.state.data
                },
                'paint': {
                    "circle-radius": 5,
                    "circle-color": "#B4D455"
                }
            });
        });

        map.on('click', 'points', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const {details. description impact, duration}
        })
        this.setState({ map });
    }

    render() {
        const { map, data } = this.state;
        if (data && !map) this.initializeMap();

        return (
            <div style={{ width: 1200, height: 700 }} id="map" />
        );
    }
}
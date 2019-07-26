import React, {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Pin from './Pin'

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_url: 'https://data.edmonton.ca/resource/87ck-293k.json',
            viewport: {
                width : 1200,
                height : 750,
                zoom: 10,
                latitude:53.5444,
                longitude:-113.4909
            },

            coords: [
                {latitude:53.5225, longitude:-113.8242},
                {latitude:53.5437, longitude:-113.4347},
            ],
            data:null
        };

    }

    componentDidMount() {
        const {data,api_url}=this.state;

        if (!data) {
            fetch(api_url, {method:'GET'})
            .then(response => response.json())
            .then(response => this.setState({data:response}));
        }
    }

    render() {
        const {coords, data} = this.state;
        return (
            <ReactMapGL
            mapboxApiAccessToken ={process.env.REACT_APP_MAPBOX_TOKEN}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}>
                {data && data.map((coord,i) => (
                    <Marker 
                    key={`Marker-${i * (Math.random() * 200 + 1)}`} 
                    latitude={coord.location.latitude} 
                    longitude={coord.location.longitude}>
                        <Pin/>
                    </Marker>
                ))}
            </ReactMapGL>

        );
    }
}
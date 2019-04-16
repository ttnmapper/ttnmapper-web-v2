import React, { Component } from 'react'
import { MapLayer, withLeaflet } from 'react-leaflet';
import oms from 'overlapping-marker-spiderfier-leaflet'
import L from 'leaflet';

class Spiderfy extends MapLayer {

    createLeafletElement(props) {
        const { map } = props.leaflet;
        this.oms = this.createOverlappingMarkerSpiderfier(map);
        const el = L.layerGroup();
        this.contextValue = { ...props.leaflet, layerContainer: el };
        return el;
    }

    componentDidMount() {
        super.componentDidMount();
        this.leafletElement.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            this.oms.addMarker(layer);
        }
        });
    }

    createOverlappingMarkerSpiderfier(map) {
        const oms = new window.OverlappingMarkerSpiderfier(map);
        oms.addListener("spiderfy", markers => {
        markers.forEach(m => m.closePopup())//force to close popup 
        if (this.props.onSpiderfy) this.props.onSpiderfy(markers);
        });
        oms.addListener("unspiderfy", markers => {
        if (this.props.onUnspiderfy) this.props.onUnspiderfy(markers);
        });
        oms.addListener("click", marker => {
        if (this.props.onClick) this.props.onClick(marker);
        });
        return oms;
    }
}

export default withLeaflet(Spiderfy);
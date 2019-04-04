import React, { Component } from 'react'
import { MapLayer, withLeaflet } from 'react-leaflet';
import oms from 'overlapping-marker-spiderfier-leaflet'
import L from 'leaflet';

class _Spiderfy extends MapLayer {

    constructor(props) {
        super(props)
        this.oms = null
    }

    createLeafletElement ({children, leaflet: {map, ...props}})  {
        let newLayer = L.featureGroup()
        this.oms = new OverlappingMarkerSpiderfier(map);

        console.log(children)

        var popup = new L.Popup();
        this.oms.addListener('click', function(marker) {
            console.log("Listener clicked")
            popup.setContent(marker.desc);
            popup.setLatLng(marker.getLatLng());
            map.openPopup(popup);
        });

        this.oms.addListener('spiderfy', function(markers) {
            map.closePopup();
          });

        

        // for (var i = 0; i< children.length; i++) {
        //     console.log(children[i])
        //     console.log(children[i]._store); 
        // }

        return newLayer
    }

    updateLeafletElement (fromProps: Object, toProps: Object): Object {
        console.log("Updated")
        console.log(fromProps)
        console.log(toProps)
    }

}


export default withLeaflet(_Spiderfy);

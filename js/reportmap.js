/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */
 
$( document ).ready( function () {

    var position = getPositionFromHash();
    var zoom = position[0];
    var center_lon = position[1];
    var center_lat = position[2];

    var center = [center_lat, center_lon];

    var version = getURLParameter('v');
    var geoJsonData = getJsonData(version);
    var map_id = geoJsonData['id'];

    var osm_classic = L.tileLayer(osmclassic_url, {
        attribution: osmclassic_attribution
    });

    var map = L.map('map', {
        layers: [osm_classic],
        center: center,
        zoom: 6
    });

    var markers = L.markerClusterGroup();

    var geoJsonLayer = L.geoJson(geoJsonData, {
        onEachFeature: function (feature, layer) {
            markers.addLayer(layer);
            layer.bindPopup(feature.properties.text);
        }
    });

    map.addLayer(markers);

    // minimappa
    var osm_minimap = new L.TileLayer(osmclassic_url, {
        minZoom: 0,
        maxZoom: 13
    });
    var miniMap = new L.Control.MiniMap(osm_minimap, {
        toggleDisplay: true
    }).addTo(map);

    // hash
    var hash = new L.Hash(map);

    /*
    * map search
    */
    map.addControl( new L.Control.Search({
        url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
        jsonpParam: 'json_callback',
        propertyName: 'display_name',
        propertyLoc: ['lat','lon'],
        markerLocation: true,
        markerIcon: L.icon({iconUrl: '../img/red_18x18.png',iconSize: [12, 12]}),
        autoType: false,
        autoCollapse: true,
        minLength: 2,
    }));

    /*
    * Geolocation on the map
    */
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    $('#locate-me').click(function() {
        map.locate({setView: true});
    });


});
/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */
 
$( document ).ready( function() {

    var position = getPositionFromHash();
    var zoom = position[0];
    var center_lon = position[1];
    var center_lat = position[2];

    var center = [center_lat, center_lon];

    var map = L.map('map').setView(center, 18);

    var center_tiles = getTileURL(center[0], center[1], 18);

    var geopoi = L.tileLayer(geopoi_url, {
        attribution: geopoi_attribution,
        tms: true,
        minZoom: 18,
        xtile_center: center_tiles[0],
        ytile_center: center_tiles[1]
    }).addTo(map);

    var osm_classic = L.tileLayer(osmclassic_url, {
        maxZoom: 18,
        attribution: osmclassic_attribution
    });
    
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

    // Use move event of map for update map center position
    map.on('move', movemarker);

    // Use dragstart event of map for update map center position
    map.on('dragstart', dragstartmarker);

    /*
    * map search
    */
    map.addControl( new L.Control.Search({
                url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
                jsonpParam: 'json_callback',
                propertyName: 'display_name',
                propertyLoc: ['lat','lon'],
                markerLocation: true,
                //markerIcon: L.icon({iconUrl: '../img/red_18x18.png',iconSize: [12, 12]}),
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

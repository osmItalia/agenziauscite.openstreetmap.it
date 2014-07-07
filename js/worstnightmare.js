/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */
var REMOTE_BASEURL;
if ( window.location.hostname === 'localhost' ) {
    REMOTE_BASEURL = '//localhost:5500/';
}
else {
    REMOTE_BASEURL = '//reportmap-cristiancantoro.rhcloud.com/';
}
 
if ( typeof (Number.prototype.toRad) === "undefined" ) {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
}

function findWithAttr(layers, attr, value) {

    for ( var layer_id in layers ) {
        if ( layers[layer_id][attr] === value ) {
            return layers[layer_id];
        }
    }
}

function findGeopoiLayer(e, geopoi_url) {
    var geopoi_layer = findWithAttr(e.target._layers, "_url", geopoi_url);

    if ( typeof (geopoi_layer) === "undefined" ) {

        for ( var layer_id in e.target._layers )  {

            var map_layers_array = e.target._layers[layer_id]._map._syncMaps;

            for ( var map_layer_id in map_layers_array ) {
                geopoi_layer = findWithAttr(map_layers_array[map_layer_id]._layers, "_url", geopoi_url);
                if ( typeof (geopoi_layer) !== "undefined" ) {
                    break;
                }
            }

            if ( typeof (geopoi_layer) !== "undefined" ) {
                    break;
            }
        }

    }

    return geopoi_layer;
}

var getTileURL = function(lat, lon, zoom) {
  var xtile = parseInt(Math.floor( (Number(lon) + 180) / 360 * (1<<zoom) ), 10);
  var ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(Number(lat).toRad()) + 1 / Math.cos(Number(lat).toRad())) / Math.PI) / 2 * (1<<zoom) ), 10);
  return [xtile, ytile];
};

var movemarker = function (e) {
    var geopoi_layer = findWithAttr(e.target._layers, "_url", geopoi_url);

    var position = e.target.getCenter();
    lat = Number(position['lat']).toFixed(5);
    lng = Number(position['lng']).toFixed(5);

    if (typeof (marker_center_left) !== 'undefined' ) {
        marker_center_left.setLatLng(position);
        marker_center_right.setLatLng(position);
    }

    tiles = getTileURL(lat, lng, e.target._zoom);
    xtile = tiles[0];
    ytile = tiles[1];

    geopoi_layer.options.xtile_center = xtile;
    geopoi_layer.options.ytile_center = ytile;
    geopoi_layer.setUrl(geopoi_url);
    
    $("#final-lat").text(lat);
    $("#final-lon").text(lng);
    $("#tile-x").text(xtile);
    $("#tile-y").text(ytile);
};

var dragstartmarker = function(e) {
    var geopoi_layer = findGeopoiLayer(e, geopoi_url);

    var position = e.target.getCenter();
    lat = Number(position['lat']).toFixed(5);
    lng = Number(position['lng']).toFixed(5);

    if (typeof (marker_center_left) !== 'undefined' ) {
        marker_center_left.setLatLng(position);
        marker_center_right.setLatLng(position);
    }

    tiles = getTileURL(lat, lng, e.target._zoom);
    xtile = tiles[0];
    ytile = tiles[1];

    geopoi_layer.options.xtile_center = xtile;
    geopoi_layer.options.ytile_center = ytile;
    geopoi_layer.setUrl(geopoi_url);


    $("#final-lat").text(lat);
    $("#final-lon").text(lng);
    $("#tile-x").text(xtile);
    $("#tile-y").text(ytile);
};

/*
* Geolocation on the map
*/
var onLocationFound = function(e) {
    var radius = e.accuracy / 2;

    var gemIcon = new L.icon({
        iconUrl: './img/blue_18x18.png',
        iconSize:     [12, 12],
    });

    var map;
    for ( var layer_id in e.target._layers )  {
        map = e.target._layers[layer_id]._map;
        break;
    }

    L.marker(e.latlng, {icon: gemIcon}).addTo(map);

    L.circle(e.latlng, radius).addTo(map);
};

var onLocationError = function(e) {
    alert(e.message);
};

/*
* Position from the url hash
*/
function getPositionFromHash() {
    var arr = window.location.hash.split('/');

    var zoom = arr[0].replace('#', '');
    var lon = arr[1];
    var lat = arr[2];

    if ( !jQuery.isNumeric(zoom)  ) {
        zoom = 6;
    }
    if ( !jQuery.isNumeric(lon)  ) {
        lon = 42.302;
    }
    if ( !jQuery.isNumeric(lat)  ) {
        lat = 10.261;
    }
    return [zoom, lat, lon];
}

/*
* Get url parameters
* taken from:
* http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
*/
function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var i, sParameterName;

    for (i = 0; i < sURLVariables.length; i = i + 1) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}

function toggleIt(element) {
    $('#' + element).slideToggle( 'slow' );
}

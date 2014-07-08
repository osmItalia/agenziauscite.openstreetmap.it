/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */

var geopoi_url = REMOTE_BASEURL + 'map/{xtile_center}/{ytile_center}/{s}/{z}/{x}/{y}.png';
var geopoi_attribution = 'Data from ' +
	'<a href="http://wwwt.agenziaentrate.gov.it/geopoi_omi/index.php">Geopoi' +
	'</a>, see <a href="http://www.geopoi.it/geopoiAPI/about.html">about</a>';

var mapbox_url = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
var mapbox_attribution = 'Map data &copy; ' +
    '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>';

var osmclassic_url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var osmclassic_attribution = 'Map data &copy; <a href="http://osm.org/copyright">' +
    'OpenStreetMap</a> contributors, Imagery &copy; OpenStreetMap';

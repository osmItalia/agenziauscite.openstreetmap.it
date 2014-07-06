/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */
 
function getJsonData(version) {
    var geoJsonData;
    var request_url = REMOTE_BASEURL;

    if (typeof version === 'undefined') {
        request_url = request_url + 'rmap/errors';
    }
    else {
        request_url = request_url + 'rmap/history/' + version;
    }

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: request_url,
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: false
        },
        async: false,
        success: function( data ) {
            geoJsonData = data;
        },
        error: function() {
            geoJsonData = [];
        }
    });

    return geoJsonData;
}

function deleteItem(deleted_item, map_id) {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: REMOTE_BASEURL +  'rmap/error/delete',
        data: {'item': deleted_item, 'map_id': map_id},
        success: function(result){
            if ( result['status'] === 0 ) {
                $('.response').toggle( "fast" );
                $('.response').addClass( "success" );
                $('.response').append("Oggetti rimossi con successo dalla mappa. ");
            }
            else {
                $('.response').addClass( "error" );
                $('.response').append(result['statusmessage']);
            }
        },
        failure: function(result) {
            $('.response').addClass( "error" );
            $('.response').append(response);        }
    });
}

function insertItem(lat, lon, map_id, id, text) {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: REMOTE_BASEURL + 'rmap/error/insert',
        data: {
            'lat': lat,
            'lon': lon,
            'map_id': map_id,
            'id': id,
            'text': text
        },
        success: function(result){
            if ( result['status'] === 0 ) {
                $('.response').toggle( "fast" );
                $('.response').addClass( "success" );
                $('.response').append("Oggetto aggiunto con successo alla mappa. ");
            }
            else {
                $('.response').addClass( "error" );
                $('.response').append(result['statusmessage']);
            }
        },
        failure: function(result) {
            $('.response').addClass( "error" );
            $('.response').append(response);
        }
    });
}
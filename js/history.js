/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */

REMOTE_BASEURL = 'http://localhost:5500/';

$(document).ready(function(){

    var table = $('#history-table')
        .dataTable({
            "ajax": REMOTE_BASEURL + 'rmap/history2',
            "language": {
                "url": "//cdn.datatables.net/plug-ins/be7019ee387/i18n/Italian.json"
            },
            "columnDefs": [{
                "render": function ( data, type, row) {
                    return '<a href="/reportmap.html?v={row_id}">{row_id}</a>'.replace(/{row_id}/g, row[0]);
                },
                "targets": 0
            }]
        });
});




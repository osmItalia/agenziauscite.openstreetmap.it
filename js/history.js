/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */
 
$(document).ready(function(){

    $.dynatableSetup({
        inputs: {
            paginationPrev: 'Precedente',
            paginationNext: 'Successivo',
            perPageText: 'Mostra: ',
            recordCountText: 'Mostrate ',
            processingText: 'Caricamento dati...'
        }
    });

    var table = $('#history-table')
        .dynatable({
            dataset: {
                ajax: true,
                ajaxUrl: REMOTE_BASEURL + 'rmap/history',
                ajaxOnLoad: true,
                records: []
            }
        });

    table.bind('dynatable:push', function(e) {
            var pagination = $('#dynatable-pagination-links-history-table');
            pagination.addClass( "pagination" );
            $('#dynatable-pagination-links-history-table > li:nth-child(1) > span').text('Pagine: ');

            var newtext = $('#dynatable-record-count-history-table').text().replace('of', 'di').replace('records', 'righe');
            $('#dynatable-record-count-history-table').text(newtext);

            $('#history-table tbody tr').each(function() {
                var row_id = $(this).children('td:first').text();

                var newtext = '<a href="/reportmap.html?v={row_id}">{row_id}</a>'.replace(/{row_id}/g, row_id);
                $(this).children('td:first').text('');
                $(this).children('td:first').append(newtext);
            });
        });
});

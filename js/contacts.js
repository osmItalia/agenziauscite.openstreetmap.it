/*!
 * Copyright 2014 Fondazione Bruno Kessler
 * Author: Cristian Consonni
 * Released under the MIT license
 *
 */

$(document).ready( function() {
    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
      String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
          return typeof args[number] != 'undefined' ? args[number]: match;
        });
      };
    }

    var hashParams = window.location.hash.substr(1).split('&');
    for(var i = 0; i < hashParams.length; i++){
        var p = hashParams[i].split('=');
        var id = '#';
        if (typeof p[0] == 'string' || p[0] instanceof String) {
            id = id + p[0];
        }
        else {
            id = id + JSON.stringify(p[0]);
        }
        $(id).val(decodeURIComponent(p[1]));
    }
    // Get the form.
    var form = $('.form-horizontal');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        $('#singlebutton').hide( );
        $('.spinner').slideToggle( 'slow' );

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData,
            success: function(response) {
                $('.response').removeClass( "success" );
                $('.response').text();

                // Get the form.
                form.hide();
                result = JSON.parse(response);

                if ( result['status'] === 0 ) {
                    $('.response').addClass( "success" );
                    $('.response').append(result['statusmessage'] + '<br />' +
                        'Name: {0}<br />'.format(result['name']) +
                        'E-mail: {0}<br />'.format(result['email']) +
                        'Message: {0}<br />'.format(result['message']) +
                        '<br />' + '<a href="#" id="reload_form">' +
                        'Invia un altro messaggio</a>'
                        );

                    $('#reload_form').click(function(){
                        window.location.hash="#name={0}&email={1}".format(
                            result['name'],
                            result['email']
                            );
                        window.location.reload();
                    });
                }

                else {
                    $('.response').addClass( "error" );

                    var link = 'Prova a ' +
                      '<a href="#" id="reload_form">' +
                      'ricarare la pagina</a> e prova a inviare di ' +
                      'nuovo il messaggio';

                    $('.response').append(result['statusmessage'] + '<br />' +
                        link);

                    $('#reload_form').click(function(){
                        window.location.hash="#name={0}&email={1}&message={2}".format(
                            result['name'],
                            result['email'],
                            encodeURIComponent(result['message'])
                            );
                        window.location.reload();
                    });
                }
            },
            error: function(response) {
                $('.response').removeClass( "success" );
                $('.response').addClass( "error" );
                $('.response').text('Errore del server!');
                $('.spinner').toggle();
                $('#singlebutton').toggle();
            }
        });
    });
});

$( document ).ready( function () {
    function getBooks( e ) {
        e.preventDefault()
        $.get( 'https://tmartin-books-api.herokuapp.com/books', function ( data ) {
            for ( let i = 0; i < data.length; i++ ) {
                let which = 'bookNum' + i
                $( '.results' ).append( `<div class="book" id="${which}"></div>` )
                for ( let key in data[ i ] ) {
                    $( "#" + which ).append( `<p>${data[i][key]}</p>` )
                }
            }
        } )
    }

    function getAuthors( e ) {
        e.preventDefault()
        $.get( 'https://tmartin-books-api.herokuapp.com/books', function ( data ) {
            for ( let i = 0; i < data.length; i++ ) {
                let which = 'bookNum' + i
                $( '.results' ).append( `<div class="book" id="${which}"></div>` )
                for ( let key in data[ i ] ) {
                    if ( key === "author_id" ) {
                        $.get( 'https://tmartin-books-api.herokuapp.com/authors/' + data[ i ][ key ], function ( author ) {
                            for ( let z = 0; z < author.length; z++ ) {
                                $( "#" + which ).append( `<p>${author[z].first_name} ${author[z].last_name}</p>` )
                            }
                        } )
                    }

                }
            }
        } )
    }
    $( '#getBooks' ).click( getBooks )
    $( '#getAuthors' ).click( getAuthors )
} )
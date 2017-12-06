$( document ).ready( function () {
    function getBooks( e ) {
        e.preventDefault()
        $.get( 'https://tmartin-books-api.herokuapp.com/books', function ( data ) {
            for ( let i = 0; i < data.length; i++ ) {
                let which = 'bookNum' + i
                $( '.results' ).append( `<div class="book" id="${which}"></div>` )
                for ( let key in data[ i ] ) {
                    if ( key === 'title' ) {
                        $( "#" + which ).append( `<p>Title: ${data[i][key]}</p>` )
                    } else if ( key === 'author_id' ) {
                        let passArg = data[ i ][ key ]
                        findAuthors( passArg, which )
                    }

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
                        let passArg = data[ i ][ key ]
                        findAuthors( passArg, which )
                    }
                }
            }
        } )
    }

    function findAuthors( data, which ) {
        $.get( 'https://tmartin-books-api.herokuapp.com/authors/' + data, function ( author ) {
            for ( let z = 0; z < author.length; z++ ) {
                $( "#" + which ).append( `<p>${author[z].first_name} ${author[z].last_name}</p>` )
            }
        } )
    }
    $( '#getBooks' ).click( getBooks )
    $( '#getAuthors' ).click( getAuthors )
} )
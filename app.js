$( document ).ready( function () {

    function mainToName( keyComparison ) {
        $.get( 'https://tmartin-books-api.herokuapp.com/books', function ( data ) {
            $( '.results' ).empty()
            for ( let i = 0; i < data.length; i++ ) {
                let which = 'bookNum' + i
                $( '.results' ).append( `<div class="book" id="${which}"></div>` )
                for ( let key in data[ i ] ) {
                    for ( let x = 0; x < keyComparison.length; x++ ) {
                        if ( key === keyComparison[ x ] ) {
                            if ( key === 'author_id' ) {
                                let passArg = data[ i ][ key ]
                                findAuthors( passArg, which )
                            } else {
                                $( "#" + which ).append( `<p>Title: ${data[i][key]}</p>` )
                            }
                        }
                    }
                }
            }
        } )
    }

    function getAuthors( e ) {
        e.preventDefault()
        $.get( 'https://tmartin-books-api.herokuapp.com/books', function ( data ) {
            $( '.results' ).empty()
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

    function getGenre( e ) {
        e.preventDefault()
        $.get( 'https://tmartin-books-api.herokuapp.com/genres', function ( data ) {
            for ( let i = 0; i < data.length; i++ ) {
                if ( data[ i ].genre === $( '#search' ).val() ) {
                    $.get( 'https://tmartin-books-api.herokuapp.com/genre/' + $( '#search' ).val(), function ( data ) {
                        $( '.results' ).empty()
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
                    break;
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
    $( '#getBooks' ).click( function ( e ) {
        e.preventDefault()
        mainToName( [ 'title', 'author_id' ] )
    } )
    $( '#getAuthors' ).click( function ( e ) {
        e.preventDefault()
        mainToName( [ 'author_id' ] )
    } )
    $( '#findBooks' ).click( getGenre )
} )
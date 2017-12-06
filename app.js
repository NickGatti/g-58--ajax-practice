$( document ).ready( function () {

    let book;

    let findAuthors = ( data, which ) => {
        $.get( 'https://tmartin-books-api.herokuapp.com/authors/' + data, function ( author ) {
            $( "#" + which ).append( `<p>${author[0].first_name} ${author[0].last_name}</p>` )
        } )
    }

    function mainToName( keyComparison ) {
        $.get( 'https://tmartin-books-api.herokuapp.com/books', function ( data ) {
            $( '.results' ).empty()
            for ( let i = 0; i < data.length; i++ ) {
                let which = 'bookNum' + i
                book = `<div class="book" id="${which}">`
                for ( let key in data[ i ] ) {
                    if ( Array.isArray( keyComparison ) ) {
                        for ( let x = 0; x < keyComparison.length; x++ ) {
                            if ( key === keyComparison[ x ] ) {
                                if ( key === 'author_id' ) {
                                    let passArg = data[ i ][ key ]
                                    book += '<h3>Author</h3>'
                                    findAuthors( passArg, which )
                                } else {
                                    book += '<h3>Title</h3>'
                                    book += `<p>${data[i][key]}</p>`
                                }
                            }
                        }
                    } else if ( keyComparison.id === data[ i ].genre_id ) {
                        book += '<h3>Title</h3>'
                        book += `<p>${data[ i ][ 'title' ]}</p>`
                        book += '<h3>Year</h3>'
                        book += `<p>${data[ i ][ 'year_published' ]}</p>`
                        book += '<h3>Author</h3>'
                        findAuthors( data[ i ].author_id, which )
                        break;
                    }
                }
                book += '</div>'
                $( '.results' ).append( book )
                if ( $( "#" + which ).contents().length === 0 ) {
                    $( '#' + which ).remove()
                }
            }
        } )
    }

    function getGenre( e ) {
        e.preventDefault()
        $.get( 'https://tmartin-books-api.herokuapp.com/genres', function ( data ) {
            for ( let i = 0; i < data.length; i++ ) {
                if ( data[ i ].genre === $( '#search' ).val() ) {
                    mainToName( {
                        'genre': $( '#search' ).val(),
                        'id': data[ i ].id
                    } )
                    break;
                }
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
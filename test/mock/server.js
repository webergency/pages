const Server = require('@liqd-js/server');

/*
const { ProductFactory } = require('./factory/product');
const { ParameterFactory } = require('./factory/parameter');
 */

module.exports = class MockServer
{
    #server;

    constructor( port )
    {
        const server = this.#server = new Server();

        /*
        server.use(( req, res, next ) =>
        {
            console.log( 'som na servri =>', req.path );

            next();
        });
         */

        server.get( '/category', ( req, res, next ) =>
        {
            let categories = [];

            for( let id of req.query.id )
            {
                categories.push(
                {
                    id          : id,
                    path        : 'category > test > ' + id,
                    name        : 'Category name ' + id,
                    title       : 'Category title ' + id,
                    description : 'Category description ' + id,
                    created     : 1587570684 + id,
                    updated     : 1587570684 + id
                })
            }

            res.reply(categories);
        });

        server.get( '/category/breadcrumb', ( req, res, next ) =>
        {
            res.reply( [ 1,2,3,4 ] );
        });

        server.get( '/category/tree', ( req, res, next ) =>
        {
            res.reply(
            [
                {
                    id: 1,
                    children:
                    [
                        {
                            id: 2,
                            children:
                            [
                                {
                                    id: 5,
                                    children:
                                    [
                                        {
                                            id: 10,
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 4,
                            children:
                            [
                                {
                                    id: 8,
                                    children:
                                    [
                                        {
                                            id: 7,
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]);
        });

        server.get( '/page', ( req, res, next ) =>
        {
            let pages = [];

            for( let id of req.query.id )
            {
                pages.push(
                    {
                        id          : id,
                        path        : 'category > test > ' + id,
                        name        : 'Category name ' + id,
                        title       : 'Category title ' + id,
                        description : 'Category description ' + id,
                        created     : 1587570684 + id,
                        updated     : 1587570684 + id
                    })
            }

            res.reply(pages);
        });

        server.listen( port );
    }

    destroy()
    {
        return new Promise( r => this.#server.close( r ));
    }
}
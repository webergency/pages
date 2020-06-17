'use strict';

const assert = require('assert');
const MockServer = require('../mock/server');
const Pages = require('../../lib/pages');

it('should create Page handle', done =>
{
    let server = new MockServer(8080), shop = new Pages({ webroot: 'http://localhost:8080', locale: 'sk' });

    shop.flow.start( async() =>
    {
        let id = 1, page = await shop.page( id );

        console.log( page )
        /*
        assert.equal( category.constructor.name, 'Category' );
        assert.equal( category.id, id );
        assert.equal( category, await shop.category( id ));


         */
        await server.destroy();

        done();
    },
    { locale: 'sk' });
});
/*
it( 'should fetch category breadcrumb', async() =>
{
    let server = new MockServer(8080), shop = new Pages({ webroot: 'http://localhost:8080', locale: 'sk' });

    let id = 4, category = await shop.category( id );

    let breadcrumb = await category.breadcrumb();

    assert.equal( breadcrumb, await category.breadcrumb( id ));

    await server.destroy();
});

it( 'should fetch category tree', async() =>
{
    let server = new MockServer(8080), shop = new Pages({ webroot: 'http://localhost:8080', locale: 'sk' });

    let id = 5, category = await shop.category( id );

    let tree = await category.tree();

    assert.equal( tree, await category.tree());

    await server.destroy();
});
*/
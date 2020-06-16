'use strict';

const Client = require('@liqd-js/client');

const Category = module.exports = class Category
{
    #ctx; #path;

    constructor( ctx, path )
    {
        this.#ctx = ctx;
        this.#path = path;
    }

    static tree( ctx, path, options = {})
    {
        if( typeof path === 'object' && !Array.isArray( path )){[ path, options ] = [ '', path ]}

        //console.log({ path, options });

        return Client.get( 'http://webergency.com:8080/categories', { query: { path, options }}).then( r => r.json );
    }

    static get( ctx, path )
    {
        //TODO cache

        return new Category( ctx, path );
    }

    async create()
    {
        return request( 'PUT', 'http://webergency.com:8080/category', { path, options });
    }

    async move( new_path )
    {
        await this.#ctx.client.patch( '/category', { body: 
        {
            path: this.#path, move: new_path
        }});
    }

    async delete()
    {
        await this.#ctx.client.delete( '/category', { body: 
        {
            path: this.#path
        }});
    }

    async pages( filter )
    {

    }
}
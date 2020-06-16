'use strict';

const { DefaultMap, DefaultWeakMap } = require('../helpers/default_containers');
const PagesCache = new DefaultWeakMap(() => new DefaultMap());

const Page = module.exports = class Page
{
    #ctx; #data = {};


    async static get( ctx, id, preload_scope )
    {
        id = parseInt( id );

        let page = PagesCache.get( ctx ).get( id, () => new Page( ctx, id ));

        /*preload_scope &&*/ await page.load( preload_scope );

        return page;
    }

    constructor( ctx, id )
    {
        this.#ctx = ctx;

        Object.defineProperty( this, 'id', { value: id, writable: false, enumerable: true });
    }

    _scope()
    {
        return { locale: this.#ctx.flow.get('locale') || this.#ctx.locale }
    }

    async load( scope = 'full' )
    {
        if( this.id === 0 ){ return }

        const { locale } = this._scope();

        /*TODO
        if( this.#data.name?.[locale] === undefined )
        {
            let category = await this.#ctx.core.call( 'get_category', { id: this.id, scope }, { country, locale });

            ObjectMerge( this.#data,
                {
                    name            : { [locale]: category.name || category.title || this.id.toString() },
                    title           : { [locale]: category.title || category.name || this.id.toString() },
                    description     : { [locale]: category.description || '' },
                    subcategories   : { [country]: category.subcategories || 0 },
                });
        }

         */
    }

    async create( data )
    {

    }

    async update( data )
    {

    }

    async move( pageID, path )
    {

    }

    async order_after( pageID, afterPageID )
    {

    }

    async duplicate( data )
    {

    }

    async delete( id )
    {

    }

    async list( filter )
    {

    }

    async tag_set( pageID, tags )
    {

    }
}
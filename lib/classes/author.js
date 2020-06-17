'use strict';

const { DefaultMap, DefaultWeakMap } = require('../helpers/default_containers');
const AuthorsCache = new DefaultWeakMap(() => new DefaultMap());

const Author = module.exports = class Author
{
    #ctx; #data = {};


    static async get( ctx, id, preload_scope )
    {
        id = parseInt( id );

        let author = AuthorsCache.get( ctx ).get( id, () => new Author( ctx, id ));

        /*preload_scope &&*/ await author.load( preload_scope );

        return author;
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

    async set( data )
    {

    }
}
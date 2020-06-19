'use strict';

require('liqd-string')('');
const ObjectMerge = require('@liqd-js/alg-object-merge');
const { DefaultMap, DefaultWeakMap } = require('../helpers/default_containers');
const Tag = require('./tag');
const Author = require('./author');
const PagesCache = new DefaultWeakMap(() => new DefaultMap());

const Page = module.exports = class Page
{
    #ctx; #data = {};

    static async get( ctx, id, preload_scope )
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

    async load( scope = 'list' )
    {
        if( this.id === 0 ){ return }

        const { locale } = this._scope();

        let promises = [];

        if( this.#data.title?.[locale] === undefined )
        {
            promises.push( this.#ctx.core.call( 'get_page', { id: this.id, scope: 'list' }, { locale }).then( async( page ) =>
            {
                page.tags = await Promise.all( page.tags.map( id => Tag.get( this.#ctx, parseInt( id ), page.tags[id] ))).catch( console.log );
                page.author = await Author.get( this.#ctx, parseInt( page.author ), page.author );

                ObjectMerge( this.#data,
                    {
                        title        : { [locale]: page.title },
                        description  : { [locale]: page.description },
                        seo          : { [locale]: page.seo },
                        category     : { [locale]: page.category },
                        tags         : page.tags,
                        author       : page.author
                    });
            }));
        }

        if( [ 'detail' ].includes( scope ) )
        {
            promises.push( this.#ctx.core.call( 'get_page', { id: this.id, scope: 'detail' }, { locale }).then( async( page ) =>
            {
                ObjectMerge( this.#data, { blocks: page.blocks });
            }));
        }

        promises.length && await Promise.all( promises );
    }

    get url()
    {
        return '/' + this.title.slugify() + '-a' + this.id;
    }

    get title()         { return this.#data.title?.[ this._scope().locale ]}
    get description()   { return this.#data.description?.[ this._scope().locale ]}
    get seo()           { return this.#data.seo?.[ this._scope().locale ]}
    get category()      { return this.#data.category?.[ this._scope().country ]}
    get tags()          { return this.#data.tags }
    get author()        { return this.#data.author }
    get blocks()        { return this.#data.blocks }

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
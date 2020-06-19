'use strict';

const ObjectMerge = require('@liqd-js/alg-object-merge');
const { DefaultMap, DefaultWeakMap } = require('../helpers/default_containers');
const TagsCache = new DefaultWeakMap(() => new DefaultMap());

const Tag = module.exports = class Tag
{
    #ctx; #data = {};


    static async get( ctx, id )
    {
        id = parseInt( id );

        let tag = TagsCache.get( ctx ).get( id, () => new Tag( ctx, id ));

        /*preload_scope &&*/ await tag.load();

        return tag;
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

    async load()
    {
        if( this.id === 0 ){ return }

        const { locale } = this._scope();

        if( this.#data.name?.[locale] === undefined )
        {
            let tag = await this.#ctx.core.call( 'get_tag', { id: this.id }, { locale });

            ObjectMerge( this.#data,
                {
                    uid    : tag.uid,
                    name   : { [locale]: tag.name || tag.uid || this.id.toString() },
                    data   : tag.data || {},
                });
        }
    }

    get uid() { return this.#data.uid; }
    get name() { return this.#data.name?.[ this._scope().locale ]; }
    get data() { return this.#data.data; }

    async create( data )
    {

    }

    async list( filter )
    {

    }
}
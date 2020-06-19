'use strict';

const ObjectMerge = require('@liqd-js/alg-object-merge');
const { DefaultMap, DefaultWeakMap } = require('../helpers/default_containers');
const AuthorsCache = new DefaultWeakMap(() => new DefaultMap());

const Author = module.exports = class Author
{
    #ctx; #data = {};


    static async get( ctx, id )
    {
        id = parseInt( id );

        let author = AuthorsCache.get( ctx ).get( id, () => new Author( ctx, id ));

        /*preload_scope &&*/ await author.load();

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

    async load()
    {
        if( this.id === 0 ){ return }

        const { locale } = this._scope();

        if( this.#data.name?.[locale] === undefined )
        {
            let author = await this.#ctx.core.call( 'get_author', { id: this.id }, { locale });

            ObjectMerge( this.#data,
                {
                    uid          : author.uid,
                    email        : author.email,
                    name         : { [locale]: author.name || this.id.toString() },
                    description  : { [locale]: author.description || '' },
                    created      : author.created,
                    updated      : author.updated
                });
        }
    }

    get uid() { return this.#data.uid; }
    get email() { return this.#data.email; }
    get name() { return this.#data.name?.[ this._scope().locale ]; }
    get description() { return this.#data.description?.[ this._scope().locale ]; }
    get created() { return this.#data.created; }
    get updated() { return this.#data.updated; }

    async set( data )
    {

    }
}
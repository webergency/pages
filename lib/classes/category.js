'use strict';

require('liqd-string')('');
const ObjectMerge = require('@liqd-js/alg-object-merge');
const { DefaultMap, DefaultWeakMap } = require('../helpers/default_containers');
const CategoriesCache = new DefaultWeakMap(() => new DefaultMap());

const Category = module.exports = class Category
{
    #ctx; #data = {};


    static async get( ctx, id )
    {
        id = parseInt( id );

        let category = CategoriesCache.get( ctx ).get( id, () => new Category( ctx, id ));

        /*preload_scope &&*/ await category.load();

        return category;
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
            let category = await this.#ctx.core.call('get_category', { id: this.id }, { locale });

            ObjectMerge( this.#data,
                {
                    name            : { [locale]: category.name || category.title || this.id.toString() },
                    title           : { [locale]: category.title || category.name || this.id.toString() },
                    description     : { [locale]: category.description || '' },
                    path            : category.path || '',
                    created         : category.created || 0,
                    updated         : category.updated || 0
                });
        }
    }

    get url()
    {
        return '/' + this.name.slugify() + '-n' + this.id;
    }

    get name() { return this.#data.name?.[ this._scope().locale ]; }
    get title() { return this.#data.title?.[ this._scope().locale ]; }
    get description() { return this.#data.description?.[ this._scope().locale ]; }
    get path() { return this.#data.path; }

    async create( data )
    {
        return await this.#ctx.core.call('put_category', { data }, { locale });
    }

    async move( path, new_path )
    {
        return await this.#ctx.core.call('put_category/move', { path, new_path }, { locale });
    }

    async delete( path )
    {
        return await this.#ctx.core.call('put_category/delete', { path }, { locale });
    }

    async reorder( sequences )
    {
        return await this.#ctx.core.call('put_category/reorder', { sequences }, { locale });
    }

    async rename( path, label )
    {
        return await this.#ctx.core.call('put_category/rename', { path, label }, { locale });
    }

    async breadcrumb()
    {
        const { locale } = this._scope();

        if( !this.#data.breadcrumb )
        {
            let breadcrumb = await this.#ctx.core.call('get_category/breadcrumb', { id: this.id }, { locale });

            this.#data.breadcrumb = await Promise.all( breadcrumb.map( id => Category.get( this.#ctx, id )));
        }

        return this.#data.breadcrumb;
    }

    async _agregateTree( tree, agregator )
    {
        for( let node of tree )
        {
            agregator.add( node.id )

            if( node.children.length )
            {
                this._agregateTree( node.children, agregator )
            }
        }
    }

    async _loadTree( tree, nodeList )
    {
        for( let node of tree )
        {
            node.id = nodeList.find( category => category.id === node.id );

            if( node.children.length )
            {
                this._loadTree( node.children, nodeList )
            }
        }
    }

    async tree( filter )
    {
        const { locale } = this._scope();

        if( !filter && this.#data.tree ){ return this.#data.tree }

        let tree = await this.#ctx.core.call('get_category/tree', { id: this.id }, { locale });

        let Tree_agregator = new Set();

        this._agregateTree( tree, Tree_agregator );

        let nodeList = await Promise.all( [...Tree_agregator].map( id => Category.get( this.#ctx, id )));

        this._loadTree( tree, nodeList );

        this.#data.tree = tree;

        return this.#data.tree;
    }

    async pages( filter )
    {
        const { locale } = this._scope();

        if( !filter && this.#data.pages ){ return this.#data.pages }

        let pages = await this.#ctx.core.call('get_category/pages', { id: this.id, filter: filter ? JSON.stringify( filter ) : undefined }, { locale });

        pages.list = await Promise.all( pages.list.map( id => ( require('./page') ).get( this.#ctx, id, 'list' )));

        if( !filter ){ this.#data.pages = pages }

        return pages;
    }
}
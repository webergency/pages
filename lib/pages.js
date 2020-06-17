const Category = require('./classes/category');
const Page = require('./classes/page');
const Tag = require('./classes/tag');
const Author = require('./classes/author');
const Flow = require('@liqd-js/flow');
const PagesCore = require('./core/Pages');

const Pages = module.exports = class Pages
{
    #options; #ctx;

    constructor( options )
    {
        this.#options = options;
        this.#ctx =
            {
                company: Object.freeze( options.company || {}),
                locale: options.locale,
                core: new PagesCore({ webroot: options.webroot }),
                flow: new Flow('@webergency/pages')
            };
    }

    get flow()
    {
        return this.#ctx.flow;
    }

    category( id )
    {
        return Category.get( this.#ctx, id );
    }

    page( id )
    {
        return Page.get( this.#ctx, id );
    }

    tag( id )
    {
        return Tag.get( this.#ctx, id );
    }

    author( id )
    {
        return Author.get( this.#ctx, id );
    }
}
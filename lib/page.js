'use strict';

const request = require('./request');

module.exports = class Page
{
    #ctx; #id;

    constructor( ctx, id )
    {
        this.#ctx = ctx;
        this.#id = id;
    }

    create()
    {
        
    }

    move( new_path )
    {

    }

    delete()
    {

    }

    articles( filter )
    {
        
    }
}


//blog.category( 'foo > bar' ).label( 'Kvety' );

/*

const Pages = require('@webergency/pages')
const blog = new Pages({ clientID: 31231231, clientSecret: '31231231' });

blog.categories.create('eshop > o nakupe')

blog.articles.list({ category: 'eshop', levels: 2, limit: 5 })

blog.articles.get( 31231 ).move( 'eshop > o spolocnosti' );
blog.articles.get( 31231 ).update({ title: '', content: 'dasda' }, format = 'markup');

blog.articles.get( 31231 ).data([ 'title', 'description' ], { locale: [ 'sk', 'cz' ]});


blog.articles.list({ category: 'eshop', levels: 2, limit: 5, properties: [ 'title', 'author', 'seo' ] });


blog.articles.get( 31231 ).tags.set([ '31231', '31231' ]);
blog.articles.get( 31231 ).tags.add([ '31231', '31231' ]);
blog.articles.get( 31231 ).tags.remove([ '31231', '31231' ]);
*/
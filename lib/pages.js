'use strict';

const Dump = ( ...data ) => data.forEach( d => console.log( typeof d === 'object' ? JSON.stringify( d, null, '  ' ) : d ));

const Category = require('./category');

const Pages = module.exports = class Pages
{
    #categories; 

    constructor( options ) // tvoje auth data
    {
        //'POST /authorize?clientID&clientSecret'
    }

    async categories( path, options )
    {
        return Category.tree({ pages: this }, path, options );
    }

    category( path )
    {
        
    }
}

let blog = new Pages();

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

blog.categories( 'eshop > foo' ).then( r => console.log( JSON.stringify( r, null, '  ' )));
blog.categories( 'eshop > foo', { depth: 2 }).then( r => console.log( JSON.stringify( r, null, '  ' )));
blog.categories({ depth: 2 }).then( r => console.log( JSON.stringify( r, null, '  ' )));*/


setInterval( async() =>
{
    let start = process.hrtime();

    let result = await blog.categories({ depth: 2 });

    let end = process.hrtime( start );

    Dump( result, `took ${( end[0] * 1e3 + end[1] / 1e6 ).toFixed(2)}ms` );
}
, 500 );

eshop.categories('eshop > about', { depth: 2, limit: 5 })
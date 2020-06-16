'use strict';

const querystring = require('querystring');

module.exports = function Request( method, url, data, options = {})
{
    return new Promise(( resolve, reject ) =>
    {
        options.headers = options.headers || {};

        if( data )
        {
            if( method === 'GET' )
            {
                //console.log( data, querystring.stringify( data ) );

                //url += ( !url.includes('?') ? '?' : '&' ) + querystring.stringify( data );
                url += ( !url.includes('?') ? '?' : '&' ) + 'path='+encodeURIComponent(data.path)+'&options[depth]=2&options[foo][bar]=foobar';
                data = undefined;
            }
            else if( method === 'POST' )
            {
                if( !options.headers ){ options.headers = {}}

                if( options.headers['Content-Type'] === 'application/x-www-form-urlencoded' )
                {
                    data = querystring.stringify( data );
                }
                else
                {
                    options.headers['Content-Type'] = 'application/json';
                    data = JSON.stringify( data );
                }
            }
        }

        let req = require( url.startsWith('https') ? 'https' : 'http' ).request( url, { method, ...options }, res =>
        {
            let body = [];

            res.on( 'data', data => body.push( data ));
            res.on( 'end', () =>
            {
                body = Buffer.concat(body).toString('utf8');

                try{ body = JSON.parse( body )}catch( e ){}

                resolve( body );
            });
            res.on( 'error', reject );

        });

        req.on( 'error', reject );

        data && req.write( data );
        req.end();
    });
}
'use strict';

class Jozko
{
    set name( value )
    {
        return new Promise(( resolve, reject ) =>
        {
            resolve( value );
        });
    }
}

let jozo = new Jozko();

async function test()
{
    await ( jozo.name = 'fero' );


    console.log( 'hotovo' );
}

test();
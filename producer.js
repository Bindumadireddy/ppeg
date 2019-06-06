'use strict';

const Hapi = require('@hapi/hapi');
var books=[
    {
        id:1,
        title:"JS Fundamentals",
        author:"John"
    },
    {
        id:2,
        title:"Angular Fundamentals",
        author:"David"
    },
    {
        id:3,
        title:"HTML/CSS Basics",
        author:"John"
    }
]

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
     server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return books;
        }
    });
      server.route({
    method: 'POST',
    path: '/',
    handler: (request, h)=>{
        
        books.push(request.payload);
        
        //const books = request.payload;
        return books;
    }
});  
    /*server.route({
    method: 'PUT',
    path: '/{title}',
    handler: (request, h)=>{
        var id=request.params.title;
        var bookToBeupdated=books.filter((book)=>{
        return book.title==id;
    })
    bookToBeupdated[0].author=request.payload.author;
        return bookToBeupdated;
        
    }
       
    
});*/
    server.route({
    method: 'PUT',
    path: '/{id}',
    handler: (request, h)=>{
        var id=request.params.id;

        var bookToBeupdated=books.filter((book)=>{

        return book.id==id;
    })
    bookToBeupdated[0].title=request.payload.title;
        return bookToBeupdated;
        
    }
       
    
});
    server.route({
    method: 'DELETE',
    path: '/{id}',
    handler: (request, h)=>{
        var id=request.params.id;

        var latestBooks=books.filter((book)=>{

        return book.id!=id;
    })
   
    return latestBooks;
        
    }
       
    
});
     
     
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
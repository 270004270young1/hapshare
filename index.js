
// const {ApolloServer} = require('apollo-server-express')
// const {createServer} = require('http')
// const {execute , subscribe} = require('graphql')
// const {SubscriptionServer} = require('subscriptions-transport-ws')
// const {makeExecutableSchema} = require('@graphql-tools/schema')
// const express = require('express')
// const {PubSub} = require('graphql-subscriptions')
// const mongoose = require('mongoose');
// const resolvers = require('./graphql/resolvers')
// const typeDefs = require('./graphql/typeDefs')

// const serverSetup = async ()=>{

//     await server.start()
//     server.applyMiddleware({app})

// }

//     const app = express()
//     const pubsub = new PubSub();
//     const httpServer = createServer(app)

//     require('dotenv').config();


//     const schema = makeExecutableSchema({typeDefs,resolvers,context:({req})=>({req,pubsub})})



//     const server = new ApolloServer({
//         schema,
//         plugins:[{
//             async serverWillStart(){
//                 return{
//                     async drainServer(){
//                         subscriptionServer.close()
//                     }
//                 }
//             }
//         }]
//     })
//     serverSetup()


//     const subscriptionServer = SubscriptionServer.create({
//         schema,
//         execute,
//         subscribe,
//     },{
//         server:httpServer,
//         path:server.graphqlPath,
//     })


//     httpServer.listen(5000,()=>{
//         console.log('Server is running')
//     })

//     mongoose.connect(process.env.DATABASE_URL,()=>{
//         console.log('Connect to db')
//     })

/*-----------------------------------------------------------*/
const { ApolloServer } = require("apollo-server")

const mongoose = require('mongoose');
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

require('dotenv').config();
const PORT = process.env.PORT || 5000
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req}),
    formatError: (err) => {

        return err
    }
})

mongoose.connect(process.env.DATABASE_URL, () => {

    console.log('Connect to db')

})

server.listen({ port: PORT })
    .then((res) => {

        console.log(`Server is running at ${res.url}`)
    }
    )
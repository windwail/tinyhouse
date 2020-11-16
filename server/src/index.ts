import express from 'express';
import {listings} from './listings';
import bodyParser from 'body-parser';
import {ApolloServer} from "apollo-server-express";
import {schema} from "./graphql";



const app = express();
const port = 9000;
const server = new ApolloServer({schema});
server.applyMiddleware({app, path: '/api'});



app.listen(port);

console.log("Server started on port "+port);
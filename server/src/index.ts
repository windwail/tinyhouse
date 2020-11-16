import express, {Application} from 'express';
import {ApolloServer} from "apollo-server-express";
import {resolvers, typeDefs} from "./graphql";
import {connectDatabase} from "./database";

const port = 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs, resolvers,
    context: () => ({db})
  });
  server.applyMiddleware({app, path: '/api'});
  app.listen(port);
  console.log("Server started on port " + port);

  const listings = await db.listings.find({})
    .toArray();
  console.log(listings);
}

mount(express());
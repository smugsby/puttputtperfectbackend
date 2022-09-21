const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");
const { authMiddleware } = require("./utils/auth.js");
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// const server = new ApolloServer({
//   resolvers,
//   typeDefs,
//   context: authMiddleware
// });
// server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
//   });

// }

//app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

async function startApolloServer() {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: authMiddleware
  }
  );
  await server.start();
  // const app = express();
  // app.use(compression());
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: process.env.PORT || 5000 }, (value) => resolve(value)));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer()
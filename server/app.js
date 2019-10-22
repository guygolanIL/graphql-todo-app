const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://guygolanil:Nordia5741376!@cluster0-1dvwl.mongodb.net/test?retryWrites=true&w=majority", err => {
  if(err) {
    console.error(err);
  }
});

mongoose.connection.once('open', () => {
  console.log('connected to db');
});

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
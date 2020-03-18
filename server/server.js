const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

const MONGO_URI =
  "mongodb+srv://iga1801:<password></password>@cluster0-nzdsj.mongodb.net/test?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// useCreateIndex added to remove the warning from the console
mongoose.set("useCreateIndex", true);

mongoose.connection
  .once("open", () => console.log("Connected to Mongo instance."))
  .on("error", error => console.log("Error connecting to Mongo", error));

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;

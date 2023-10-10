const mongoose = require('mongoose');
require("dotenv").config()

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/idf9');
  await mongoose.connect(process.env.DB_CONNECT);
  console.log("mongo connect solider atlas");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const mongoose = require("mongoose");

async function connectDatabase(databaseUrl) {
  try {
   await mongoose.connect(databaseUrl).then(()=>{
     console.log("Db is connected");
   })
  } catch (error) {
    console.error("Error while connecting to db", error);
  }
}

module.exports = connectDatabase;

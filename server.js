require("dotenv").config();
const app = require("./src/app");
const connectDatabase = require("./src/db/db");
const databaseUrl = process.env.DATABASE_URL;
const PORT = process.env.PORT | 3000;

connectDatabase(databaseUrl);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

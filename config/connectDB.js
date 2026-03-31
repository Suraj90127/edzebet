const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "195.35.22.205",
  user: "newclub",
  password: "newclud",
  database: "newclub",
});

export default connection;

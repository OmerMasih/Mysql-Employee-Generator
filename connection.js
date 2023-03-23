const mysql = require("mysql2");

let db = mysql.createConnection({
  user: "root",
  password: "12345678",
  port: 3306,
  host: "127.0.0.1",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("You are connected to the server");
});

module.exports = db;

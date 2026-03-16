
require('dotenv').config();
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "FOUND (length " + process.env.DATABASE_URL.length + ")" : "NOT FOUND");
console.log("DIRECT_URL:", process.env.DIRECT_URL ? "FOUND" : "NOT FOUND");

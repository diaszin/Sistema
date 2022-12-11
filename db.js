const mysql = require("mysql2")


var conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "sd_estoque"
})

module.exports = conexao
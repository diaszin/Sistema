const mysql = require("mysql2")

try{
    var conexao = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "sd_estoque"
    })
}catch {
    console.error("Error creating connection")
}

module.exports = conexao
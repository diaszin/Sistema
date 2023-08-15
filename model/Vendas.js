const { query } = require("../db")
const conexao = require("../db")

class Vendas {
    add(nome,valor, data, quantidade,marcaProduto, res) {
        const sql = "INSERT INTO vendas SET ?"
        const values= {
            nome: nome,
            valor: valor,
            data_de_vendas: data,
            quantidade: quantidade,
            marca: marcaProduto
        }

        conexao.query(sql, values, (erro, result) => {
            if (erro) {
                console.log(erro)
            }
            else {
                res.redirect("/venda")
            }
        })
    }

    deletar(id, res){
        const sql = "DELETE FROM vendas WHERE id=?"
        conexao.query(sql, id, (erro, result)=>{
            if(erro){
                console.log(erro)
            }else{
                res.redirect("/venda")
            }
        })
    }

    atualizar(values, id, res){
        const sql = "UPDATE vendas SET ? WHERE id=?"
        for(var item in values){
            if(values[item].length == 0){
                delete values[item]
            }
        }
        
        conexao.query(sql, [values, id], (error, result)=>{
            if(error){
                console.log(error)
            }
            else{
                res.redirect("/venda")
            }
        })
    }
}

module.exports = new Vendas
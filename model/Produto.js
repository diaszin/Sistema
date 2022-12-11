const { query } = require("../db")
const conexao = require("../db")

class Produto {
    add(nome,valor, data, quantidade,res) {
        const sql = "INSERT INTO produto SET ?"
        const values= {
            nome: nome,
            valor: valor,
            data_de_fabricacao: data,
            quantidade: quantidade
        }

        conexao.query(sql, values, (erro, result) => {
            if (erro) {
                console.log(erro)
            }
            else {
                res.redirect("/funcionario")
            }
        })
    }

    deletar(id, res){
        const sql = "DELETE FROM produto WHERE id=?"
        conexao.query(sql, id, (erro, result)=>{
            if(erro){
                console.log(erro)
            }else{
                res.redirect("/funcionario")
            }
        })
    }

    atualizar(values, id, res){
        const sql = "UPDATE produto SET ? WHERE id=?"
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
                res.redirect("/funcionario")
            }
        })
    }
}

module.exports = new Produto
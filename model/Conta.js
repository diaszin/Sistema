const conexao = require("../db")

class Cliente{
    add(values,res){
        const sql = "INSERT INTO contas SET ?"
        conexao.query(sql, values, (erro, result)=>{
            if(erro){
                console.log(erro)
            }else{
                res.redirect("/")
            }
        })
    }

    atualizar(id, values, res){
        const sql = "UPDATE contas SET ? WHERE id=?"
        conexao.query(sql, [values, id], (erro, result)=>{
            if(erro){
                console.log(erro)
            }else{
                res.redirect("/")
            }
        })
    }
}

class Funcionario{
    signIn(email,senha){
        const sql = `SELECT * FROM contas where email=${'"'+email+'"'} and senha=${'"'+senha+'"'}`
        const resu = conexao.query(sql, (erro, result)=>{
            if(parseInt(result.length) == 1){
                return  true
            }
            else{
                return false
            }
        })

        return resu
    }
}


module.exports = new Funcionario
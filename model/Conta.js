const conexao = require("../db");



class Conta{
    autenticar_conta_cliente(email, senha){
        return new Promise((resolve, reject) => {
            const sql = "SELECT email, senha FROM contas WHERE email=? and senha=? and tipo='cliente'"
            let resultado = conexao.query(sql,[email, senha], (error, result)=>{
                if (error){
                    reject(error)
                }else{
                    if(result.length > 0){
                        if(result[0].email == email && result[0].senha == senha){
                            resolve(true)
                        }
                    }
                    else{
                        resolve(false)
                    }
                }
            })
        })
    }
}



module.exports = new Conta
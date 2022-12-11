const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const Funcionario = require("./model/Conta")
const Produto = require("./model/Produto")
const conexao = require("./db")

app = express()
porta = 3000

app.set("view engine", "ejs")
app.set("views", "./view")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "node_modules")))
console.log(path.join(__dirname, "public"))
var isFuncLogado = false // Para privatizar as rotas, variavel que verifica se foi logado como funcionário


app.get("/", (req, res) => {
    const sql = "SELECT * FROM produto"
    conexao.query(sql, (error, result)=>{
        if(error){
            res.status(400)
        }else{
            res.render("cliente/index", {data: result})
        }
    })
})

app.get("/login/cliente", (req, res) => {
    res.render("cliente/login_cliente")
})

app.get("/login/funcionario", (req, res) => {
    res.render("cliente/login_funcionario")
})
app.post("/login/funcionario", (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    var verificacao = Funcionario.signIn(email, senha)

    if(verificacao){
        isFuncLogado = true
        res.redirect("/funcionario")
    }
    else{
        res.redirect("/login/funcionario")
    }
})


app.get("/funcionario", (req, res) => {
    if(isFuncLogado){
        const sql = "SELECT * FROM produto"
        conexao.query(sql, (error, result)=>{
            res.render("funcionarios/indexFuncionario", {data: result})
        })
    }
    else{
        res.send("400")
    }
})

app.post("/funcionario/cadastrar/produto", (req, res) => {
    // inserir função que cadastra os produtos aqui e redirecionar para a página normal
    var nomeProduto = req.body.nomeProduto
    var valorProduto = req.body.valorProduto
    var dataFabricacaoProduto = req.body.dataFabricacaoProduto
    var quantidadeProduto = req.body.quantidade

    Produto.add(nomeProduto, valorProduto, dataFabricacaoProduto,quantidadeProduto, res)
})


app.post("/funcionario/deletar/produto", (req, res)=>{
    if(isFuncLogado){
        const id= req.body.id
        Produto.deletar(id, res)
    }
    else{
        res.send("400")
    }
})
app.post("/funcionario/atualizar/produto", (req, res)=>{
    if(isFuncLogado){
        const mudancas = req.body
        const id = req.body.id
        Produto.atualizar(mudancas, id, res)
    }
    else{
        res.send("400")
    }
})




app.listen(porta, () => { console.log("O Servidor é localhost:" + porta) })
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
// Classes internas
const Produto = require("./model/Produto")
const Vendas = require("./model/Vendas")
const conexao = require("./db")
const Conta = require("./model/Conta")

app = express()
porta = 3000 // Definindo a porta

app.set("view engine", "ejs") // Definindo o tipo da view
app.set("views", "./view") // Setando a pasta das "views" do projeto

// Definindo as sessions
app.use(session({
    secret: 'keyboard_cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))
app.use(flash())

// Body Parser
app.use(bodyParser.urlencoded({ extended: false })) // Descompactando as informações do body
// Definindo os arquivos estáticos
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "node_modules")))


var isFuncLogado = false // variavel que verifica se foi logado como funcionário
var clienteLogado = false // variavel que verifica se foi logado como cliente
function setFuncLogado(valor) {
    isFuncLogado = valor
}
function setClienteLogado(valor) {
    clienteLogado = valor
}


app.get("/", (req, res) => {
    const sql = "SELECT id, nome, valor FROM produto ORDER BY id DESC"
    conexao.query(sql, (error, result) => {
        if (error) {
            res.status(400).json()
        } else {
            if (result.length > 0) {
                req.flash("cliente_logado", clienteLogado)
                res.render("cliente/index", { data: result, clienteLogado: clienteLogado})
            }
            else {
                res.render("erros/semNenhumProduto")
            }
        }
    })
})


app.get("/login/funcionario", (req, res) => {
    res.render("funcionarios/login_funcionario")
})



app.post("/login/funcionario", (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    const sql = "SELECT email, senha FROM contas WHERE email=? and senha=? and tipo='funcionario'"
    const contaSelecionada = conexao.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length == 1 && result[0].email == email && result[0].senha == senha) { // Autenticando o usuário
                setFuncLogado(true)
                res.redirect("/funcionario")
            } else {
                res.redirect("/login/funcionario")
            }
        }
    })
})


app.get("/funcionario", (req, res) => {
    if (isFuncLogado) {
        const sql = "SELECT id, nome, valor, DATE_FORMAT(data_de_fabricacao, '%d/%m/%Y') AS data_de_fabricacao FROM produto"
        conexao.query(sql, (error, result) => {
            var resultadoTratado = []
            for (let i = 0; i < result.length; i++) {
                resultadoTratado.push({
                    id: result[i]["id"],
                    nome: result[i]["nome"],
                    valor: result[i]["valor"],
                    data_de_fabricacao: result[i]["data_de_fabricacao"],
                    quantidade: result[i]["quantidade"]
                })
            }
            res.render("funcionarios/indexFuncionario", { data: resultadoTratado, sucess: req.flash("success"), deletarTodo: req.flash("deletarTodo") })
        })
    }
    else {
        res.status(403).json()
    }
})

app.post("/funcionario/cadastrar/produto", (req, res) => {
    // inserir função que cadastra os produtos aqui e redirecionar para a página normal
    let nomeProduto = req.body.nomeProduto
    let valorProduto = req.body.valorProduto
    let dataFabricacaoProduto = req.body.dataFabricacaoProduto
    let quantidadeProduto = req.body.quantidade
    let marcaProduto = req.body.marcaProduto
    let descricaoProduto = req.body.descricao

    req.flash('success', "true")
    Produto.add(nomeProduto, valorProduto, dataFabricacaoProduto, quantidadeProduto, marcaProduto, descricaoProduto, res)
})


app.post("/funcionario/deletar/produto", (req, res) => {
    if (isFuncLogado) {
        const id = req.body.id
        Produto.deletar(id, res)
    }
    else {
        res.status(404).json()
    }
})
app.post("/funcionario/atualizar/produto", (req, res) => {
    if (isFuncLogado) {
        const mudancas = req.body
        const id = req.body.id
        Produto.atualizar(mudancas, id, res)
    }
    else {
        res.status(404).json()
    }
})
app.get("/funcionario/deletartodo/produto", (req, res) => {
    if (isFuncLogado) {
        const sql = "DELETE FROM produto"
        conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error)
            }
        })
        req.flash("deletarTodo", "true")
        res.redirect("/funcionario")
    }
    else {
        res.status(403).json()
    }
})

app.get("/venda", (req, res) => {
    if (isFuncLogado) {
        const sql = "SELECT id, nome, valor, DATE_FORMAT(data_de_vendas, '%d/%m/%Y'), quantidade FROM vendas"
        conexao.query(sql, (error, result) => {
            var resultadoTratado = []
            for (let i = 0; i < result.length; i++) {
                resultadoTratado.push({
                    id: result[i]["id"],
                    nome: result[i]["nome"],
                    valor: result[i]["valor"],
                    data_venda: result[i]["data_de_vendas"],
                    quantidade: result[i]["quantidade"]
                })
            }

            res.render("funcionarios/registrarVenda", { data: resultadoTratado })
        })
    }
    else {
        res.status(403).json()
    }
})

app.post("/funcionario/registrar/venda", (req, res) => {
    // inserir função que cadastra os produtos aqui e redirecionar para a página normal
    var nomeProduto = req.body.nomeProduto
    var valorProduto = req.body.valorProduto
    var dataVenda = req.body.data_de_vendas
    var quantidadeProduto = req.body.quantidade
    var marcaProduto = req.body.marcaProduto

    Vendas.add(nomeProduto, valorProduto, dataVenda, quantidadeProduto, marcaProduto, res)
})


app.post("/funcionario/deletar/venda", (req, res) => {
    if (isFuncLogado) {
        const id = req.body.id
        Vendas.deletar(id, res)
    }
    else {
        res.status(404).json()
    }
})

app.post("/funcionario/atualizar/venda", (req, res) => {
    if (isFuncLogado) {
        const mudancas = req.body
        const id = req.body.id
        Vendas.atualizar(mudancas, id, res)
    }
    else {
        res.status(404).json()
    }
})

app.get("/funcionario/deletartodo/venda", (req, res) => {
    if (isFuncLogado) {
        const sql = "DELETE FROM vendas"
        conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error)
            }
        })
        res.redirect("/vendas")
    }
    else {
        res.status(404).json()
    }
})


app.get("/produto/comprar/:id_produto", (req, res) => {
    id_produto = req.params.id_produto
    const sql = "SELECT  id, nome, descricao FROM produto WHERE id=" + id_produto + " LIMIT 1;"
    conexao.query(sql, (error, result) => {
        if(error){
            throw error
        }else{
            result_tratado = {
                id: result[0].id,
                nome: result[0].nome,
                descricao: result[0].descricao
            }
    
            return res.render("cliente/telaDeCompra.ejs", { data: result_tratado, clienteLogado: clienteLogado})
        }
    })
})
// Login Cliente
app.get("/login/cliente", (req, res) => {
    res.render("cliente/login", {erro: req.flash('erro')})
})

app.post("/login/cliente", (req, res) => {
    email = req.body.email
    senha = req.body.senha
    let autentica_conta = Conta.autenticar_conta_cliente(email, senha)
    autentica_conta.then((result) => {
        if(result ==  true){
            setClienteLogado(true)
            res.redirect("/")
        }
        else{
            req.flash("erro", {
                title:"Conta invalida",
                text: "Não possivel localizar !!!"
            })
            console.log(req.flash("error"))
            res.redirect("/login/cliente")
        }
    })
})

// Conta Cliente
app.get("/cliente/conta", (req, res) => {
    if(clienteLogado){
        res.render("cliente/perfilCliente", {clienteLogado: clienteLogado})
    }else{
        res.status(403).json()
    }
})




app.listen(porta, () => { console.log("O Servidor é localhost:" + porta) })
// Configuração do servidor
const express = require("express")
const server = express()

// Configuração do servidor para apresentar arquivos estáticos
server.use(express.static('public'))

// Body do formulário
server.use(express.urlencoded({ extended: true }))



// Conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Poll({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'doe',
})


// Configuração template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, 
})


server.get("/", function (res, res) {
    db.query("SELECT * FROM donors", function (err, result) {
        if (err) return red.send("Erro de banco de dados.")

        const donors = result.rows
        return res.render("index.html", { donors })

    })
})

server.post("/", function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood


    // Se algum campo estiver vazio...
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigátorios.")

    }

    // Alimentação do banco de dados.
    const query = `INSERT INTO donors ("name", "email", "blood")
    VALUE ($1, $2, $3)`
    const values = [name, email, blood]
    db.query(query, values, function (err) {
        // fluxo de erro
        if (err) return res.send("Erro no banco de dados.")
        // fluxo ideal
        return res.redirect("/")
    })

})

// Acesso à porta 3000
server.listen(3000, function () {
    console.log("Servidor rodando na porta 3000.")
})
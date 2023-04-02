const express = require("express")
const {connection} = require("../db/connect");
const cors = require("cors");


const app = express();

app.use(express.json());

app.use(cors());

connection.connect(function(err){

    if (err) return console.error('Erro ao realizar a conexão com BD: ' + err.stack);
    console.log("Conectado")
});



app.post("/login",  (req, res) => { 
    const email = req.body.email;
    const senha = req.body.senha;

    connection.query(`select email, senha from login where email = '${email}' and senha = '${senha}'`, (err, rows, fields) => {
        if (err) return console.log(err);

        if (rows.length <= 0) return res.json({message: "User Not Found"});
        console.log(rows);

        return res.json({message: "Login Success"})
    });
});

app.get("/getAllUsersInfo", (req, res) => {
    connection.query(`SELECT * FROM users `, (err, rows) => {
        if (err) return console.log(err);

        res.json(rows);
    });

})

app.get("/getUserInfo", (req, res) => {
    connection.query(`SELECT * FROM login where id = 1`, (err, rows) => {
        if (err) return console.log(err);

        res.json(rows);
    });

})

app.post("/addUser", (req, res) => {
    console.log(req.body);
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const senha = req.body.senha;
    const telefone = req.body.telefone;
    const cep = req.body.cep;
    const endereco = req.body.endereco;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const dataNascimento = req.body.dataNascimento;


    connection.query(`INSERT INTO users (nome, cpf, email, senha, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, data_nascimento) VALUES ('${nome}', '${cpf}', '${email}', '${senha}', '${telefone}', '${cep}', '${endereco}', ${numero}, '${complemento}', '${bairro}', '${cidade}', '${estado}', '${dataNascimento}');`,(err, result) => {
    if (err) return console.log(err)
        console.log(result)
    })
})

app.patch("/updateUser",(req, res) => {
    const id = req.body.id;

    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const senha = req.body.senha;
    const telefone = req.body.telefone;
    const cep = req.body.cep;
    const endereco = req.body.endereco;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const dataNascimento = req.body.dataNascimento;


    connection.query(`UPDATE users set nome = '${nome}', cpf = '${cpf}', email = '${email}', senha = '${senha}', telefone = '${telefone}', cep = '${cep}', endereco = '${endereco}', numero = ${numero}, complemento = '${complemento}', bairro = '${bairro}', cidade = '${cidade}', estado = '${estado}', data_nascimento ='${dataNascimento}' where id = ${id};`,(err, result) => {
    if (err) return console.log(err)
        console.log(result)
    })
})


app.delete("/deleteUser/:id",(req, res) => {
    const id = req.params.id;

    connection.query(`DELETE FROM users where id = ${id}`,(err, result) => {
    if (err) return console.log(err)
        console.log(result)
    })
})

app.listen(3000, () => console.log("Rodando na porta 3000"));
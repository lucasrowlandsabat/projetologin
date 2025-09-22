const express = require("express");
const fs= require("fs");
const path=require("path");
const bcrypt= require("bcrypt");
const jwt =require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port=5001;
const SECRET_KEY ='12345678910';// CRIAR UMA STRING LONGA PARA RENOVAR A CHAVE DE SEGURANÇA

app.use(cors());
app.use(express());

// LOCAL AONDE ESTA O ARQUIVO DO SEU BANCO DE DADOS
const localDados =path.join(__dirname,'data/usuarios.json');


// FUNÇÃO PARA LER O ARQUIVO DO BANCO DE DADOS

const consultarUsuarios=()=>{
    const data =fs.readFileSync(localDados,'utf8');
    return JSON.parse(data);
}

// FUNÇÃO PARA GRAVAR NO ARQUIVO DO BANCO DE DADOS

const salvarUsuarios=(users)=>{
    fs.writeFileSync(localDados,JSON.stringify(users,null,2));
}

//ROTA PARA REGISTRAR USUÁRIO

app.post('/register', async (req,res)=>{
    const {email, senha}=req.body;

    if(!email || !senha){
        return res.status(400).json({message:"Campos obrigatórios"})
    }
    const users = consultarUsuarios();
    if(users.find(users.email == email)){
        return res.status(400).json({message:"Email já cadastrado no banco de dados"})
    }
    //criptografando a senha
    const hashSenha = await bcrypt.hash(senha,10)
    const novoUsuario = {id:Date.now(),email, senha:hashSenha};
    users.push(novoUsuario);
    salvarUsuarios(users);

    res.status(200).json({message:"Usuário registrado com sucesso"})
})

//ROTA DO LOGIN

app.post("/login",async(req,res)=>{
    const {email,senha}= req.body;
    const users = consultarUsuarios();
    const user = users.find(user=>user.email === email);

    if(!user){
       res.status(400).json({message:"Usuario/senha inválidos"}) 
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)
    if(!senhaValida){
        res.status(400).json({message:"senha inválida"})
    }
    //AUTENTIFICAÇÃO USANDO JWT
    const token =jwt.sign({id:user.id, email: user.email}, SECRET_KEY, {expiresIn:'10m'});
    res.json({message:"Login realizado com sucesso",token});   
})


app.listen(port,()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})
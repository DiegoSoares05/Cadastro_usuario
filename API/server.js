import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express(); // o app tem acesso a tudo que tem dentro do express

app.use(express.json());
app.use(cors());

//const users = [];

app.post("/usuarios", async (req, res) => {
  // como é assincrona, precisa colocar o async
  res.status(201).json(req.body); // quantos o status é 200 é que deu tudo certo

  await prisma.user.create({
    // função assincrona, que vai demorar um tempo para ser executada
    data: {
      email: req.body.email, // rec é a requisição e res é a resposta
      name: req.body.name,
      age: req.body.age,
    },
  });
});

app.get("/usuarios", async (req, res) => {
  let users;
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        age: req.query.age,
        email: req.query.email,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users); // quantos o status é 200 é que deu tudo certo
});

app.put("/usuarios/:id", async (req, res) => {
  console.log(req);
  // // como é assincrona, precisa colocar o async
  res.status(201).json(req.body); // quantos o status é 200 é que deu tudo certo
  await prisma.user.update({
    // função assincrona, que vai demorar um tempo para ser executada
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email, // rec é a requisição e res é a resposta
      name: req.body.name,
      age: req.body.age,
    },
  });
});

app.delete("/usuarios/:id", async (rec, res) => {
  await prisma.user.delete({
    where: {
      id: rec.params.id,
    },
  });
  res.status(200).json({ message: "usuario deletado com sucesso!" });
});

app.listen(3000);

/* 
  1) tipo de de rota / método HTTP 
  2) endereço 

  Objetivo: Criar nossa API de usuarios 

  - Criar um usuario 
  - listar todos os usuarios 
  - editar um usuario 
  - deletar um usuario 

  node --watch server.js

  npx prisma studio 
*/

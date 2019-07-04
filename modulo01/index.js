const express = require("express");

server = express();

server.use(express.json());

const users = ["germano", "renato", "jean"];

server.use((req, res, next) => {
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  console.time("Request");
  next();
  console.timeEnd("Request");
});

function checkUsersName(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: "Users name not found." });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "Index out of range." });
  }
  return next();
}

//localhost3000
server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", checkUsersName, (req, res) => {
  const { nome } = req.body;

  users.push(nome);

  return res.json(users);
});

server.put("/users/:index", checkUserInArray, checkUsersName, (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;

  users[index] = nome;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);

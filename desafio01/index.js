const express = require("express");

server = express();
server.use(express.json());

const project = [
  {
    id: 1,
    title: "novo projeto",
    tasks: ["nova tarefa"]
  }
];
var index;
var count = 0;
server.use((req, res, next) => {
  count++;
  console.log(`total number requisitions: ${count}`);
  return next();
});

function checkIdExists(req, res, next) {
  index = -1;
  const { id } = req.params;
  for (i = 0; i < project.length; i++) {
    if (project[i].id == id) {
      index = i;
      return next();
    }
  }
  return res.status(400).json({ error: "Project does not exist." });
}

server.post("/projects", (req, res) => {
  var projeto = {
    id: req.body.id,
    title: req.body.title,
    tasks: req.body.tasks
  };
  project.push(projeto);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(project);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  project.splice(index, 1);
  return res.json(project);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { title } = req.body;

  project[index].title = title;

  return res.json(project);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { title } = req.body;

  project[index].tasks.push(title);

  return res.json(project);
});

server.listen(3001);

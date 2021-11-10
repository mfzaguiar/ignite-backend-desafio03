const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;
 
  repository = repositories.find(repository => String(repository.id) === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const newRepository = { ...repository, ...updatedRepository, likes: repository.likes };

  repositories.map(repository => {
    if(String(repository.id) === id) {
      return {
        ...newRepository
      }
    }else{
      return repository
    }
  })

  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => String(repository.id) === String(id))

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => String(repository.id) === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repository = repositories[repositoryIndex];
  const likes = Number(repository.likes) + 1;

  const updatedRepository = {
    ...repository,
    likes
  }; 

  repositories[repositoryIndex] = updatedRepository

  return response.json(updatedRepository);
});

module.exports = app;

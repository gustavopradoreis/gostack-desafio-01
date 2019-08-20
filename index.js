const express = require('express');
const server = express();
server.use(express.json());

const projects = [];
let ping = 0;


// Middlewares
server.use((req, res, next) => {
    ping++;

    console.log(`Pong ${ping}`);

    return next();
})

function projectExists(req, res, next) {
    if (!projects.find(project => project.id === req.params.id)) {
        return res.status(400).json({ error: "Project does not exists" });
    }

    return next();
}

// Routes
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id, title,
        tasks: []
    }

    projects.push(project);
        
    return res.json(projects);
})

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.put('/projects/:id', projectExists, (req, res) => {
    const project = projects.find(project => project.id === req.params.id);

    project.title = req.body.title;

    return res.json(project);
})

server.delete('/projects/:id', projectExists, (req, res) => {
    const projectIndex = projects.findIndex(project => project.id === req.params.id);

    projects.splice(projectIndex, 1);

    return res.send();
})

server.post('/projects/:id/tasks', projectExists, (req, res) => {
    const { title: task } = req.body;
    const project = projects.find(project => project.id === req.params.id);

    project.tasks = [...project.tasks, task];

    return res.json(project);
})

// Server start
server.listen(3000);
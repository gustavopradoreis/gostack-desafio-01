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

})

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.put('/projects/:id', projectExists, (req, res) => {
    return res.json(projects.find(project => project.id === req.params.id));
})

server.delete('/projects/:id', projectExists, (req, res) => {

})

server.post('/projects/:id/tasks', projectExists, (req, res) => {

})

// Server start
server.listen(3000);
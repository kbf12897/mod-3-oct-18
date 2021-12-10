const http = require('http');
const fs = require("fs");

let database = [];
let taskId = 1;
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
        
    if (req.method === "GET" && req.url === "/") {
        const htmlPage = fs.readFileSync("index.html", "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(htmlPage);
    }

    if (req.method === "GET" && req.url === "/main.css") {
        const resBody = fs.readFileSync("main.css");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        return res.end(resBody);
    }

    if (req.method === "GET" && req.url === "/index.js") {
        const resBody = fs.readFileSync("index.js");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/js");
        return res.end(resBody);
    }

    let reqBody = "";
    req.on("data", (data) => {
        reqBody += data;
    });

    req.on("end", () => {
        // Parsing the body of the request
        if (reqBody) {
            if (req.headers['content-type'] === 'x-www-form-urlencoded') {
                req.body = reqBody
                    .split("&")
                    .map((keyValuePair) => keyValuePair.split("="))
                    .map(([key, value]) => [key, value.replace(/\+/g, " ")])
                    .map(([key, value]) => [key, decodeURIComponent(value)])
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {});
            } else if (req.headers['content-type'] === 'application/json') {
                req.body = JSON.parse(reqBody);
            }
        }
        if (req.method === "POST" && req.url === "/api/tasks") {
            console.log(taskId);
            req.body.id = taskId;
            taskId++;
            database.push(req.body);
            console.log(database);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(req.body));
        }

        if (req.method === "DELETE" && req.url.startsWith("/api/tasks")) {
            const id = req.url.split('/')[2];
            const idx = database.findIndex(task => task.id === parseInt(id));
            database.splice(idx, 1);
            console.log(database);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({"message": `Task ${id} successfully deleted`}));
        }
        res.statusCode = 404;
        res.end("That url doesn't exist")
    });
    
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
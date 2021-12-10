const http = require('http');
const fs = require("fs");

let database = []; // { tasks: 'Reading', time: '10:40', taskId: 1 }, { tasks: 'Playing', time: '10:40', taskId: 2 }
let taskId = 1;
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === "GET" && req.url === "/") {
        const htmlPage = fs.readFileSync("index.html", "utf-8");
        const taskList = database.map(task => {
            return `<li>${task["tasks"]} - ${task["time"]}</li>`;
        });
        
        const resBody = htmlPage.replace("#{tasks}", taskList.join(""));
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(resBody);
    }

    if (req.method === "GET" && req.url === "/main.css") {
        const resBody = fs.readFileSync("main.css");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        return res.end(resBody);
    }

    let reqBody = "";
    req.on("data", (data) => {
        reqBody += data;
    });

    req.on("end", () => {
        if (reqBody) {
            req.body = reqBody // tasks=Reading&time=08%3A00
                .split("&") // [tasks=Reading, time=08%3A00]
                .map((keyValuePair) => keyValuePair.split("=")) // [[tasks, Reading], [time, 08%3A00]]
                .map(([key, value]) => [key, value.replace("+", " ")]) // [[tasks, Reading], [time, 08%3A00]]
                .map(([key, value]) => [key, decodeURIComponent(value)]) // [[tasks, Reading], [time, 08:00]]
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {}); // {'tasks': 'Reading, 'time': '08:00'}
                
            if (req.method === "POST" && req.url === "/tasks") {
                req.body.taskId = taskId;
                taskId++;
                console.log(req.body);

                database.push(req.body);
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            }

            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            return res.end(`<html><h1>Page not found</h1></html>`);
        }
    });

    // app.use(express.urlencoded);
   
    
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
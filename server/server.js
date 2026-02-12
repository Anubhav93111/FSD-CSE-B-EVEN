import http from "http";
import os from 'os'
  let body = "";
  let data = [];
const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === "/" && req.method === "GET") {
        res.write("<h1>Home Page</h1>");
    } 
    else if (url === "/about" && req.method === "GET") {
        res.write("<h1>About Page</h1>");
    } 
    else if (url === "/contact" && req.method === "GET") {
        res.write("<h1>Contact Page</h1>");
    } 
    else if (url === "/senddata" && req.method === "POST") {
      

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            console.log(body, "data received");
            res.write("<h1>Data Received</h1>");
            res.write(`<p>${body}</p>`);
            res.end(); // IMPORTANT: end inside async block
        });

        return; // prevent extra res.end()
    } 
    else if (url === "/viewdata" && req.method === "GET") {
        res.setHeader("Content-Type","apllication/json")
        res.end(JSON.stringify(data)+"View DAta")
    } 
    else if (url === "/system" && req.method === "GET") {
        const sysdata ={
            platform: os.platform(),
            arch:os.arch(),
            cpu:os.cpus().length,
            totalRam:(os.totalmem()/1024**3).toFixed(2)+"GB",
            freeRam: (os.freemem()/1024**3).toFixed(2)+"GB"
        }
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify(sysdata))
    } 
    else {
        res.statusCode = 404;
        res.write("<h1>Page Not Found</h1>");
    }

    res.end(); // normal end
});

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});

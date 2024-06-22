const http = require("http");
http
  .createServer(function (req, res) {
    // res.writeHead(200, { "Content-Type": "text/plain" });
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.writeHead(200, { "Content-Type": "text/xml" });
    // res.end("Hello NodeJS!");JS
    // res.end("<h1>Hello NodeJS!</h1>");
    // res.write(JSON.stringify({ name: "Maryam", course: "NodeJS & ExpressJS" }));
    res.write("<XML><key>this is an XML key!</key></XML>");
    res.end();
  })
  .listen(3000, () => {
    console.log("server is running on port 3000 : http://localhost:3000");
  });

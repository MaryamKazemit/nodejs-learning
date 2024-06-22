const http = require("http");
const products = require("./data/products");
const productController=require("./controllers/product.controllers")
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url == "/api/products") {
    productController.get(req,res)
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Route Not Found" }));
    res.end();
  }
});

server.listen(PORT);
// string template,text
console.log(`run server on port ${PORT} http://localhost:${PORT}`);

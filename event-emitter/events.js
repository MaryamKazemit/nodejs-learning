// observer pattern
const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmmiter = new EventEmitter();

// observer of the emitter
myEmmiter.on("newSale", () => {
  console.log("there was a new sale!");
});

myEmmiter.on("newSale", () => {
  console.log("customer name: maryam");
});

myEmmiter.on("newSale", (stock) => {
  console.log(`there are now ${stock} items left in stock.`);
});

// emit the event
myEmmiter.emit("newSale", 9);

// ###########################################################

const server = http.createServer();

// on listens for an event
server.on("request", (req, res) => {
  console.log("request received");
  console.log(req.url);
  res.end("req received!");
});

server.on("request", (req, res) => {
  console.log("another req received!");
});

server.on("close", (req, res) => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for requests...");
});

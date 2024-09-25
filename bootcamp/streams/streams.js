const fs = require("node:fs");
const server = require("node:http").createServer();
server.on("request", (req, res) => {
  // //   1-read then store and send to client(load entire file after that it can send it on large req or file we wll face problem and node process will run out of resources and everything will crash)
  //     fs.readFile("test-file.txt", (err, data) => {
  //       if (err) console.log(err);
  //       res.end(data);
  //     });
  //   // 2-read stream and send it chunk bu chunk as we read
  //     const readable = fs.createReadStream("test-file.txt");
  //     readable.on("data", (chunk) => {
  //       res.write(chunk);
  //     });
  //     //   while the whole data is received
  //     readable.on("end", () => {
  //       res.end();
  //     });
  //     readable.on("error", (err) => {
  //       console.log(err);
  //       res.statusCode = 500;
  //       res.end("file not found");
  //     });
  //   3-using pipe operator to fix back pressure problem by balancing the speed of i/o data
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening.....");
});

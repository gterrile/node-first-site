import http from "node:http"
import url from "node:url"
import fs from "node:fs"

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

const indexPage = fs.readFileSync("index.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

http.createServer(function (req, res) {
  let query = url.parse(req.url, true)
  let filename = '.' + query.pathname
  console.log(filename)
  
  // index page case
  if (filename === './') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(indexPage);
      return res.end();
  }

  // rest of website
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(page404)
      return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
}).listen(8081)
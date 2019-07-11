const http = require("http");
const url = require("url");
function handler(req, res) {
  const parseUrl = url.parse(req.url, true);

  if (parseUrl.pathname === "/") {
    res.writeHead(200, { "Content-type": "text-plain" });
    res.write("Hello, I am a webserver. My name is Tucker.");
    return res.end();
  } else if (parseUrl.pathname === "/time") {
    res.writeHead(200, { "Content-type": "text-plain" });
    res.write(new Date().toString());
    return res.end();
  } else if (parseUrl.pathname === "/hello") {
    const name = parseUrl.query.name;
    if (!name) {
      res.writeHead(400, { "Content-type": "text-plain" });
      return res.end();
    }
    res.writeHead(200, { "Content-type": "text-plain" });
    res.write(`Hello ${name}`);
    return res.end();
  } else if(parseUrl.pathname.startsWith('/user/')) {
    const regex = new RegExp('\/user\/(.+)');
    const matches = regex.exec(parseUrl.pathname);
    if (!matches || !matches[1]) {
      res.writeHead(400, { "Content-type": "text-plain" });
      return res.end();
    }
    res.writeHead(200, { "Content-type": "text-plain" });
    res.write(`Userprofile of ${matches[1]}`);
    return res.end();
  } else {
    res.writeHead(404, { "Content-type": "text-plain" });
    return res.end();
  }
}

const server = http.createServer(handler);

server.listen(3000);

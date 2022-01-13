// trigger rebuild
const http = require('http');
const path = require('path')
const fs = require('fs');

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript',
    json: 'application/json'
};

let send_file = function (filename: string, res) {
    var type = mime[path.extname(filename).slice(1)] || 'text/plain';
    var s = fs.createReadStream(filename);
    s.on('open', function () {
        res.setHeader('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });
}

let server = http.createServer((req, res) => {
    let headers = req.headers;
    if (req.method !== 'GET') {
        res.statusCode = 501;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Method not implemented');
    }
    switch (req.url) {
        case "/": return send_file("./index.html", res);
        case "/scorpia.gif": return send_file("./scorpia.gif", res);
        case "/icon.ico": return send_file("./500.png", res);
        case "/style.css": return send_file("./style.css", res);
        case "/about": return send_file("./about.html", res)
        default: res.statusCode = 404; return res.end('<h1 style="text-align:center;padding:100px;">404 Page not found</h1>');
    }
});
console.log("Attached")
server.listen(1337, "");

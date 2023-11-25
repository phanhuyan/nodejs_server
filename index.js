const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url + '.html';

    // If the file path is just '/', then serve index.html
    if (filePath === './.html') {
        filePath = './index.html';
    }

    // Read the file and serve the appropriate content
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If file not found, serve 404.html
            fs.readFile('./404.html', (err, notFoundContent) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(notFoundContent, 'utf-8');
            });
        } else {
            // Serve the requested HTML file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const port = 8080;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>NodeJS Basics</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit" >Send</button></form></body>');
        res.write('</html>');

        return res.end();
    }

    // create a file with dummy text
    if (req.url === '/message' && method === 'POST') {

        console.log('got here');

        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })

        let message = '';

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })

        // res.writeHead(302, '', { 'Location': '/' });
        // res.statusCode = 302;
        // res.setHeader('Location', '/');

        return res.end();
    }

    // send a response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>NodeJS Basics</title></head>');
    res.write('<body><h1>Welcome to my Node.js Server</h1></body>')
    res.write('</html>');

    res.end();

})

server.listen(3000);
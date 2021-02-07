const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    res.write('<html>')
    res.write('<head><title>NodeJS Basics Review</title></head>')
    res.write('<body>')

    if (url === '/') {
        res.write('<form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form>')
        res.write('</body>')
        res.write('</html>')

        return res.end();
    }

    if (url === '/message') {

        let message = '';
        const chunks = [];

        req.on('data', (chunk) => { chunks.push(chunk) });
        req.on('end', () => {
            const parsedData = Buffer.concat(chunks).toString();
            message = parsedData.split('=')[1];
            fs.writeFileSync('message.txt', message)
        })

        res.write('</body>')
        res.write('</html>')

        return res.end()
    }

    

})

server.listen(3000);
const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Assignment 1</title></head>')
        res.write('<body><h2>Hello, world.</h2>')
        res.write(`
            <form action="/create-user" method="POST">
                <input type="text" name="username" placeholder="Enter your username"/> 
                <button type="submit">Submit</button>
            </form>`
        )
        res.write('</body>')
        res.write('</html>')

        return res.end()
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Assignment 1</title></head>')
        res.write('<body><ul><li>Daniel</li><li>Blessed</li><li>Rotimi</li></ul></body>')
        res.write('</html>')

        return res.end()
    }

    if (url === '/create-user') {
        const body = [];

        req.on('data', (chunk) => { body.push(chunk) })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const username = parsedBody.split('=')[1]

            console.log('Username gotten is: ' + username)
        })

        res.statusCode = 302
        res.setHeader('Location', '/')

        res.end()

    }


}

module.exports = {
    handler: requestHandler
}
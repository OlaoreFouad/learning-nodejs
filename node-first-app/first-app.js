const fs = require('fs');

fs.writeFile(
    'hello.txt', 
    'This is coming from the first-app JavaScript script (see what I did there! :\') )', null, 
    () => {
        console.log('Contents written to file successfully!');
    }
)

console.log('Hello, from NodeJS');
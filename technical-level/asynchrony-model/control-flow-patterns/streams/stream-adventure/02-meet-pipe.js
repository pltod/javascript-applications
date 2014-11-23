//pipe is the methods used to transfer data from readable to writeable stream
//we first read and then write data

var fs = require('fs');
fs.createReadStream(process.argv[2]).pipe(process.stdout);
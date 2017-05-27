var fs=require('fs');
var spawn = require('child_process').spawn;
var tty2html=require('./tty2html');

var output=fs.createWriteStream('stream.html') // or it is can be Express.js Response stream
output.write('<pre>'); //for a \t indentation support

var t2h=tty2html(/* tagName or 'span' as default */);
t2h.pipe(output);

var child = spawn('diff',['tty2html.js','test.js','--color=always'] );
child.stdout.pipe(t2h);
child.stderr.pipe(t2h);

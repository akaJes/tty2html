# tty2http
This is a stream middleware for visualization results from **color** console output to **HTML**
# Installation
`npm --save i tty2http`
# Example
run from root of module `npm i && npm test`

convert colorized console output of commend `diff  tty2html.js test.js --color=always ` to html

with ability for stream support and show this result online
```javascript
var fs=require('fs');
var spawn = require('child_process').spawn;
var tty2html=require('tty2html');

var output=fs.createWriteStream('stream.html') // or it is can be Express.js Response stream
output.write('<pre>'); //for a \t indentation support

var t2h=tty2html(/* tagName or 'span' as default */);
t2h.pipe(output);

var child = spawn('diff',['tty2html.js','test.js','--color=always'] );
child.stdout.pipe(t2h);
child.stderr.pipe(t2h);
```

var parser = require('ansi-style-parser');
var through = require('through');

var excludes={
  'bold': 'font-weight: bolder;',
  'dim': 'font-weight: lighter;',
  'italic': 'font-style: italic;',
  'underline': 'text-decoration: underline;',
  'inverse': 'filter: invert(100%);',
  'hidden': 'visibility: hidden;',
  'strikethrough': 'text-decoration: line-through;',
}

var toCSS=(style)=>excludes[style]||style.slice(0,2)=='bg'&&('background-color: '+style.slice(2)+';')||('color: '+style+';');

var expand=(str)=>str.replace(/\u001b\[([\d;]+)m/g,(match,p)=>p.split(';').map(i=>'\u001b['+i+'m').join(''));

module.exports=(tag)=>through(function(data){
  tag=tag||'span';
  var html=parser(expand(data.toString()))
  .filter(ob=>ob.text.length)
  .map(ob=>{
    var text=ob.text.replace(/&/g,'&amp;'); //&
    text=text.replace(/>/g,'&gt;').replace(/</g,'&lt;'); //<>
    text=text.replace(/\r\n?|\n/g,'<br>'); // \r\n
    if (ob.styles.length) //styles
      text='<'+tag+' style="'+ob.styles.map(toCSS).join('')+'">'+text+'</'+tag+'>';
    return text;
  })
  .join('')
  this.queue(html)
})
/* USAGE
var fs=require('fs');
var spawn = require('child_process').spawn;
var child = spawn('ls',['-alx','--color=always'] );

var output=fs.createWriteStream('stream.html')
output.write('<pre>');
var t2h=require('tty2html')();
t2h.pipe(output);
child.stdout.pipe(t2h);
child.stderr.pipe(t2h);
*/

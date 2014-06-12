'use strict';
const fs = require('fs');

const parser = require('./tykescript').parser;
const TykeBuild = require('./TykeBuild');
const TykeTranslate = require('./TykeTranslate');
const TykeGenerate = require('./TykeGenerate');

var source = fs.readFileSync(process.argv[2], 'utf-8');

var lex = new TykeBuild();

parser.yy = lex;

try{
	var parsed = parser.parse(source);
}catch(e){
	console.log('Ey Up!');
	console.log(e.message);
	process.exit();
}

var tree = parsed.getTree();

console.log(tree);

process.exit();
var translator = new TykeTranslate(tree);

var jsTree = translator.translate();

var generator = new TykeGenerate(jsTree);

console.log(generator.generate());

//console.log(parser.parser.yy);
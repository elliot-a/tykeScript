'use strict';

const TykeGenerate = function(tree){
	this.tree = tree;
};

TykeGenerate.prototype.generate = function(){
	return this._parseExpr(this.tree);
};

TykeGenerate.prototype._parseExpr = function(expr){
	var output = [];
	switch(expr.type){
		case 'bool':
		case 'number':
			output.push(expr.symbol);
			break;
		case 'bool_compare':
			output.push(this._parseExpr(expr.left));
			output.push(expr.comparison);
			output.push(this._parseExpr(expr.right));
			break;
		default:
			throw new Error('Unknown Type : ' + expr.type);
			break;
	}

	return output.join(' ');
};


module.exports = TykeGenerate;
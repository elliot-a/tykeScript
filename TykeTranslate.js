'use strict';

const TykeTranslate = function(tree){
	this.tree = tree;
};

TykeTranslate.prototype.translate = function() {
	return this._parseExpr(this.tree);
};

TykeTranslate.prototype._parseExpr = function(expr){
	var output = {};
	output.type = expr.type;
	switch(expr.type){
		case 'bool':
			output.symbol = expr.symbol === 'aye';
			break;
		case 'number':
			output.symbol = expr.symbol;
			break;
		case 'bool_compare':
			output.left = this._parseExpr(expr.left);
			output.right = this._parseExpr(expr.right);
			output.comparison = expr.comparison === 'is' ? '===' : '!==';
			break;
		default:
			throw new Error('Unknown Type : ' + expr.type);
			break;
	}

	return output;
};


module.exports = TykeTranslate;
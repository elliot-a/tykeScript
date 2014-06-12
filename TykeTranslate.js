'use strict';

const TykeTranslate = function(tree){
	this.tree = tree;
};

TykeTranslate.prototype.translate = function() {
	return this.tree.map(function(statement){ 
		return this._parseExpr(statement);
	}.bind(this));
};

TykeTranslate.prototype._parseExpr = function(expr){
	var output = {};
	output.type = expr.type;
	switch(expr.type){
		case 'bool':
			output.symbol = expr.symbol === 'aye';
			break;
		case 'number':
		case 'label':
			output.symbol = expr.symbol;
			break;
		case 'label_list':
			output.labels = expr.labels.map(function(label){
				return this._parseExpr(label);
			}.bind(this));
			break;
		case 'bool_compare':
			output.left = this._parseExpr(expr.left);
			output.right = this._parseExpr(expr.right);
			output.comparison = expr.comparison === 'is' ? '===' : '!==';
			break;
		case 'assignment':
			output.label = expr.label;
			output.expr = this._parseExpr(expr.expr);
			break;
		case 'statement':
			output.statement = this._parseExpr(expr.statement);
			break;
		case 'function':
			output.label = this._parseExpr(expr.label);
			output.statements = expr.statements.map(function(statement){return this._parseExpr(statement)}.bind(this));
			output.arguments = this._parseExpr(expr.arguments);
			break;
		case 'function_call':
			output.label = this._parseExpr(expr.label);
			break;
		default:
			throw new Error('Unknown Type : ' + expr.type);
			break;
	}

	return output;
};


module.exports = TykeTranslate;
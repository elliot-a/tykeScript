'use strict';

const TykeGenerate = function(tree){
	this.tree = tree;
};

TykeGenerate.prototype.generate = function(){
	var statements =  this.tree.map(function(statement){ 
		return this._parseExpr(statement);
	}.bind(this));

	return statements.join(';\n') + ';';
};

TykeGenerate.prototype._parseExpr = function(expr){
	var output = [];
	switch(expr.type){
		case 'bool':
		case 'number':
		case 'label':
		case 'string':
			output.push(expr.symbol);
			break;
		case 'arg_list':
			{
				let list = expr.args.map(function(arg){
					return this._parseExpr(arg);
				}.bind(this)).join(', ');
				output.push(list);
			}
			break;
		case 'label_list':
			{
				let list = expr.labels.map(function(label){
					return this._parseExpr(label);
				}.bind(this)).join(', ');
				output.push(list);
			}
			break;
		case 'bool_compare':
			output.push(this._parseExpr(expr.left));
			output.push(expr.comparison === 'is' ? '===' : '!==');
			output.push(this._parseExpr(expr.right));
			break;
		case 'assignment':
			output.push('var');
			output.push(this._parseExpr(expr.label));
			output.push('=');
			output.push(this._parseExpr(expr.expr));
			break;
		case 'statement':
			output.push(this._parseExpr(expr.statement));
			break;
		case 'function':
			output.push('function');
			{
				let name = this._parseExpr(expr.label);
				let parens = '(' + this._parseExpr(expr.arguments) + ')';
				output.push(name + parens);
			}
			output.push('{\n\t');
			
			{
				let statements = expr.statements.map(function(statement){
						return this._parseExpr(statement)
				}.bind(this));
				output.push(statements.join(';\n\t') + ';');
			}
			output.push('\n}');
			break;
		case 'function_call':
			{
				let name = this._parseExpr(expr.label);
				let args = '(' + this._parseExpr(expr.args) + ')';
				output.push(name + args);
			}
			break;
		default:
			throw new Error('Unknown Type : ' + expr.type);
			break;
	}

	return output.join(' ');
};


module.exports = TykeGenerate;
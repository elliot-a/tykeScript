'use strict';

const TykeBuild = function(){
	this.tree = [];
};

TykeBuild.prototype.add = function(tree) {
	this.tree = this.tree.concat(tree);
};


TykeBuild.prototype.getTree = function(){
	return this.tree;
};


TykeBuild.prototype.bool_compare = function(left, comparison, right){
	return {
		type: 'bool_compare',
		left: left,
		comparison:comparison,
		right:right
	};
}

TykeBuild.prototype.bool_literal = function(symbol){
	return {type:'bool', symbol:symbol};
};

TykeBuild.prototype.number_literal = function(symbol){
	return {type:'number', symbol:symbol};
};

TykeBuild.prototype.label = function(symbol){
	return {type:'label', symbol:symbol};
};

TykeBuild.prototype.function = function(label, statements){
	return {type:'function', label:label, statements:statements};
};

TykeBuild.prototype.function_call = function(label){
	return {type:'function_call', label:label};
};

TykeBuild.prototype.assignment = function(label, expr){
	return {type:'assignment', label:label, expr:expr};
};


TykeBuild.prototype.statement = function(statement){
	return [{type:'statement', statement:statement}];
};

TykeBuild.prototype.add_statement = function(statements, statement){
	return statements.concat(this.statement(statement));
};


module.exports = TykeBuild;
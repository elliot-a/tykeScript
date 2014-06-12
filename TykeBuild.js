var TykeBuild = function(){
	this.tree = [];
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

TykeBuild.prototype.assignment = function(label, expr){
	return {type:'assignment', label:label, expr:expr};
};

TykeBuild.prototype.add_statement = function(statement){
	this.tree.push( {type:'statement', statement:statement});
};


module.exports = TykeBuild;
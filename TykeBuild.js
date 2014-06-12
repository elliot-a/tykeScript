var TykeBuild = function(){
	this.tree = {};
};

TykeBuild.prototype.add = function(tree){
	this.tree = tree;
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

module.exports = TykeBuild;
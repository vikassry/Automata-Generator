

var get_combination = function(first, rest, result){
  if(rest.length){
      var combinations = rest.map(function(each_rest){
          result.push(first.concat(each_rest));
          return first.concat(each_rest);
      });
      combinations.slice(0,-1).forEach(function(combination, index){
          get_combination(combination, rest.slice(index+1), result);
      });
      return;
  }
}

var find_combinations = function (elements) {
  var result = [];
  elements.map(function(element, index){
      return get_combination(elements.slice(index,index+1), elements.slice(index+1),result);
    });
    return elements.concat(result);
};



exports.get_combination = get_combination;
exports.find_combinations = find_combinations;

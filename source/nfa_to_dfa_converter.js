var getEpsilonStatesFrom = require('./NFA_Generator').getEpsilonStatesFrom;
var DFA_Generator = require('./DFA_Generator');

var NFA_to_DFA_converter = function (NFA_tuple) {
    var DFA_tuple = {};
    var initial_state = findInitialState(NFA_tuple.initial_state, NFA_tuple.delta).join(',');
    DFA_tuple.initial_state = initial_state;
    return DFA_Generator(DFA_tuple.states, DFA_tuple.alphabets, DFA_tuple.delta, DFA_tuple.initial_state, DFA_tuple.final_states);

};

var get_combination = function (first, rest, result) {
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
};

var find_combinations = function (elements) {
    var result = [];
    elements.map(function(element, index){
      return get_combination(elements.slice(index,index+1), elements.slice(index+1),result);
    });
    return elements.concat(result);
};

var findInitialState = function (initial_state, delta) {
    return getEpsilonStatesFrom([initial_state], delta);
};

exports.get_combination = get_combination;
exports.find_combinations = find_combinations;
exports.NFA_to_DFA_converter = NFA_to_DFA_converter;

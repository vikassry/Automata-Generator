var getEpsilonStatesFrom = require('./NFA_Generator').getEpsilonStatesFrom;
var NFA_Generator = require('./NFA_Generator').NFA_Generator;
var DFA_Generator = require('./DFA_Generator');
var contains = require('./utils.js').contains;
var doIntersect = require('./utils.js').doIntersect;
var _ = require("lodash");


var NFA_to_DFA_converter = function (NFA_tuple) {
    var DFA_tuple = {};
    var initial_state = findInitialState(NFA_tuple.initial_state, NFA_tuple.delta);
    DFA_tuple.initial_state = initial_state;
    return NFA_Generator(NFA_tuple.states, NFA_tuple.alphabets, NFA_tuple.delta,
        NFA_tuple.initial_state, NFA_tuple.final_states);

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
    return getEpsilonStatesFrom([initial_state], delta).join(',');
};

var findFinalStates = function (final_states, all_state_combinations) {
    return all_state_combinations.filter(function(combo_state){
        return doIntersect(combo_state.split(','), final_states);
    });
};



exports.get_combination = get_combination;
exports.find_combinations = find_combinations;
exports.NFA_to_DFA_converter = NFA_to_DFA_converter;
exports.findInitialState = findInitialState;
exports.findFinalStates = findFinalStates;

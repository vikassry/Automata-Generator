var getEpsilonStatesFrom = require('./NFA_Generator').getEpsilonStatesFrom;
var findStatesOn = require('./NFA_Generator.js').findStatesOn;
var DFA_Generator = require('./DFA_Generator');
var contains = require('./utils.js').contains;
var doIntersect = require('./utils.js').doIntersect;
var _ = require("lodash");


var NFA_to_DFA_converter = function (NFA_tuple) {
    var alphabets = NFA_tuple.alphabets;
    var states = findCombinations(NFA_tuple.states, true);
    var initial_state = findInitialState(NFA_tuple.initial_state, NFA_tuple.delta);
    var final_states = findFinalStates(NFA_tuple.final_states, states);
    var DFA_delta = convertNfaTransitionToDfa(states,alphabets,NFA_tuple.delta);
    return DFA_Generator(states, alphabets, DFA_delta, initial_state, final_states);
};

var findCombinations = function (states, join) {
    var result = [];
    states.map(function(state, index){
        return get_combination(states.slice(index,index+1),states.slice(index+1),result, join);
    });
    return states.concat(result);
};

var findInitialState = function (initial_state, delta) {
    return getEpsilonStatesFrom([initial_state], delta).join();
};

var findFinalStates = function (final_states, all_state_combinations) {
    return all_state_combinations.filter(function(combo_state){
        var comb_state = getArray(combo_state, ',');
        return doIntersect(comb_state, final_states);
    });
};

var get_combination = function (first, rest, result, join) {
  if(rest.length){
      var combinations = rest.map(function(each_rest){
      (join) && result.push(first.concat(each_rest).join()) ||
          result.push(first.concat(each_rest));
      return first.concat(each_rest);
      });
      combinations.slice(0,-1).forEach(function(combination, index){
          get_combination(combination, rest.slice(index+1), result, join);
      });
      return;
  }
};

var convertNfaTransitionToDfa = function (all_states,alphabets,delta) {
    return all_states.reduce(function(DFA_delta, comb_state){
        DFA_delta[comb_state] = alphabets.reduce(function(transition, alphabet){
          comb_state = getArray(comb_state, ',');
            transition[alphabet] = _.union(findStatesOn(alphabet,comb_state, delta)).sort().join();
            return transition;
        },{});
        return DFA_delta;
    }, {});
};

// var filterUnnecessaryStates = function (delta) {
//     return Object.keys(delta).filter(function(state){
//         return hasIncomingTransition(state, delta);
//     });
// };
//
// var hasIncomingTransition = function (state, delta) {
//     return Object.keys(delta).reduce(function(hasTransition, state){
//         (delta[state]) && (hasTransition = true);
//         return hasTransition;
//     }, false);
// };

var getArray = function(string, splitter){
    return Array.isArray(string) ? string : string.split(splitter);
};

exports.get_combination = get_combination;
exports.findCombinations = findCombinations;
exports.NFA_to_DFA_converter = NFA_to_DFA_converter;
exports.findInitialState = findInitialState;
exports.findFinalStates = findFinalStates;
exports.convertNfaTransitionToDfa = convertNfaTransitionToDfa;

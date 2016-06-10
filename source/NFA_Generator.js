var _ = require("lodash");
var nfa_lib = require('./utils.js');
var epsilon = "ε";

var isInFinalState = nfa_lib.isInFinalState;
var isSubsetOf = nfa_lib.isSubsetOf;
var isValidString = nfa_lib.isValidString;
var isValidTransitionFunction = nfa_lib.isValidTransitionFunction;
var isValidFinalStates = nfa_lib.isValidFinalStates;
var isInitialStateValid = nfa_lib.isInitialStateValid;
var contains = nfa_lib.contains;
var validateTuple = nfa_lib.validateTuple;


var NFA_Generator = function (states, alphabets, delta, initial_state, final_states){
	return function(input_text){
			validateTuple(input_text, states, alphabets, delta, initial_state, final_states);
			var final_state_candidates =  resolveState(input_text, initial_state, delta);
			return isInFinalState(final_state_candidates, final_states);
	};
};

var resolveState = function(input, initial_state, delta){
		var possible_initial_states = getEpsilonStatesFrom([initial_state], delta);
		return input.split('').reduce(function(states, alphabet) {
		    return findStateseFor(alphabet,states, delta);
	}, possible_initial_states);
};

var findStateseFor = function(alphabet, states, delta){
		var next_states = _.flatten(states.map(function(state){
				return delta[state] && delta[state][alphabet] || [];
		}));
		return getEpsilonStatesFrom(next_states,delta);
}

var getEpsilonStatesFrom = function(states, delta){
    var eps_states = _.flatten(states.map(function(state){
        return (delta[state] && delta[state][epsilon]) ? delta[state][epsilon] : [];
    }));
    if (isSubsetOf(eps_states, states))
		 		return states;
		return getEpsilonStatesFrom(_.union(states,eps_states), delta);
};


module.exports = NFA_Generator;

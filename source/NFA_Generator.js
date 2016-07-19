var _ = require("lodash");
var util = require('./utils.js');
var epsilon = "ε";

var doIntersect = util.doIntersect;
var isSubsetOf = util.isSubsetOf;
var isValidString = util.isValidString;
var isValidTransitionFunction = util.isValidTransitionFunction;
var isValidFinalStates = util.isValidFinalStates;
var isInitialStateValid = util.isInitialStateValid;
var validateTuple = util.validateTuple;


var NFA_Generator = function (states, alphabets, delta, initial_state, final_states){
	return function(input_text){
			validateTuple(input_text, states, alphabets, delta, initial_state, final_states);
			var final_state_candidates =  resolveState(input_text, initial_state, delta);
			return doIntersect(final_state_candidates, final_states);
	};
};


var resolveState = function(input, initial_state, delta){
		var possible_initial_states = getEpsilonStatesFrom([initial_state], delta);
		return input.split('').reduce(function(states, alphabet) {
		    return findStatesOn(alphabet,states, delta);
	}, possible_initial_states);
};

var findStatesOn = function(alphabet, states, delta){
		var next_states = _.flatten(states.map(function(state){
				return delta[state] && delta[state][alphabet] || [];
		}));
		return getEpsilonStatesFrom(next_states,delta);
}

var getEpsilonStatesFrom = function(states, delta){
    var epsilon_states = _.flatten(states.map(function(state){
        return (delta[state] && delta[state][epsilon]) ? delta[state][epsilon] : [];
    }));
    if (isSubsetOf(epsilon_states, states))
		 		return states;
		return getEpsilonStatesFrom(_.union(states,epsilon_states), delta);
};


exports.NFA_Generator = NFA_Generator;
exports.getEpsilonStatesFrom = getEpsilonStatesFrom;
exports.findStatesOn = findStatesOn;

var _ = require("lodash");
var epsilon = "ε";

var NFA_Generator = function (states, alphabets, delta, initial_state, final_states){
	return function(input_text){
			validateTuple(input_text, states, alphabets, delta, initial_state, final_states);
			var final_state_candidates =  resolveState(input_text, initial_state, delta);
			return isInFinalState(final_state_candidates, final_states);
	};
};

var isInFinalState = function (final_state_candidates, final_states){
		var final_candidates = _.intersection(final_state_candidates, final_states);
		return isNotEmpty(final_candidates);
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

var isSubsetOf = function (subset_candidate, superSet){
		return subset_candidate.every(function(element){
			return contains(superSet, element);
	});
};

var isValidString = function (input, all_alphabets){
		var input_alphabets =  (Array.isArray(input)) ? input : input.split('');
		return isSubsetOf(input_alphabets, all_alphabets);
};

var isValidTransitionFunction = function (delta, states){
		return isSubsetOf(Object.keys(delta), states);
};

var isValidFinalStates = function (final_states, states){
		return (final_states.length) ? isSubsetOf(final_states, states) : false;
};

var isInitialStateValid = function (initial_state, states){
		return contains(states,initial_state);
}

var isEmpty = function (array) {
		return array.length == 0;
};

var isNotEmpty = function (array) {
		return !isEmpty(array);
};

var contains = function (array, element) {
		return array.indexOf(element) > -1;
};

var validateTuple = function (input_text, states, alphabets, delta, initial_state, final_states){
		if(!isValidString(input_text, alphabets))
				throw ("Invalid Input String!! Please use ("+ alphabets.join(",")+ ") only");
		if(!isInitialStateValid(initial_state, states))
				throw ("Invalid Initial State!!");
		if(!isValidTransitionFunction(delta, states))
				throw ("Invalid Transition Function!!");
		if(!isValidFinalStates(final_states, states))
			throw ("Invalid Final states!!");
};

var getEpsilonStatesFrom = function(states, delta){
    var eps_states = _.flatten(states.map(function(state){
        return (delta[state] && delta[state][epsilon]) ? delta[state][epsilon] : [];
    }));
    if (isSubsetOf(eps_states, states))
		 		return states;
		return getEpsilonStatesFrom(_.union(states,eps_states), delta);
};


exports.NFA_Generator = NFA_Generator;

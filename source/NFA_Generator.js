var _ = require("lodash");
var epsilon = "ε";

var NFA_Generator = function (states, alphabets, delta, initial_state, final_states){
	return function(input_text){
		if (!isValidString(input_text, alphabets))
			throw ("Input is wrong!! Please provide input using ("+ alphabets.join(",")+ ") alphabets");

		if(!isValidTransitionFunction(delta, states))
			throw ("Invalid Transition Function!!");

		if(!isValidFinalStates(final_states, states))
			throw ("Invalid Final states!!");

		var final_state_candidates =  resolveState(input_text, delta, initial_state);
		var epsilons_states_at_end = getEpsilonStatesFromStates(final_state_candidates, delta);
		final_state_candidates = final_state_candidates.concat(_.flatten(epsilons_states_at_end));
		return isInFinalState(final_state_candidates, final_states);
	}
};

var isInFinalState = function (final_state_candidates, final_states){
		var intersection = _.intersection(final_state_candidates, final_states);
		return isNotEmpty(intersection);
};

var resolveState = function(input, delta, initial_state){
		if(isEmpty(input))
				return getEpsilonStatesFor(initial_state, delta).concat(initial_state);
		return input.split('').reduce(function(states, alphabet) {
		    return state_mapper(alphabet,states, delta);
	}, [initial_state]);
};

var state_mapper = function(alphabet, states, delta){
		return _.flatten(states.map(function(state){
				var next_state = delta[state] && delta[state][alphabet] || [];
				if (delta[state] && delta[state][epsilon])
						return next_state.concat(state_mapper(alphabet,delta[state][epsilon],delta));
				return next_state;
		}));
}

var getEpsilonStatesFor = function(state, delta){
		var states_epsilon_transactions = (delta[state] && delta[state][epsilon])
				&& delta[state][epsilon] || [];
		return states_epsilon_transactions;
};

var getEpsilonStatesFromStates = function(final_state_candidate, delta){
		return final_state_candidate.map(function(final_state_candidate){
				return getEpsilonStatesFor(final_state_candidate, delta);
		});
};

var isSubsetOf = function (subset_candidate, superSet){
		return subset_candidate.every(function(element){
			return contains(superSet, element);
	});
};

var isValidString = function (input, all_alphabets){
		var uniq_input_alphabets =  (Array.isArray(input)) ? input : input.split('');
		return isSubsetOf(uniq_input_alphabets, all_alphabets);
};

var isValidTransitionFunction = function (delta, states){
		return isSubsetOf(Object.keys(delta), states);
};

var isValidFinalStates = function (final_states, states){
		return (final_states.length) ? isSubsetOf(final_states, states) : false;
};

var isEmpty = function (string) {
		return string.length == 0;
};

var isNotEmpty = function (string) {
		return !isEmpty(string);
};

var contains = function (array, element) {
		return array.indexOf(element) > -1;
};

exports.NFA_Generator = NFA_Generator;

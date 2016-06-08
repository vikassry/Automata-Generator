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
		epsilon_states_for_final_state_candidates = getEpsilonStatesFrom(final_state_candidates, delta);
		final_state_candidates = final_state_candidates.concat(_.flatten(epsilon_states_for_final_state_candidates));
		return hasFinalState(final_state_candidates, final_states);
	}
};

var hasFinalState = function (final_state_candidates, final_states){
		var final_states = _.intersection(final_state_candidates, final_states);
		return final_states.length > 0;
};

var resolveState = function(input, delta, initial_state){
    if (input.length==0)
				return (delta[initial_state][epsilon]) ? delta[initial_state][epsilon] : [initial_state];
		return input.split('').reduce(function(states, alphabet, index) {
		    return _.flatten(states.map(function(state){
						var epsilon_states = getEpsilonStates(state,delta);
						var epsilon_transacted_states = getStatesAfterEpsilonTransaction(epsilon_states, alphabet,delta);
            return (delta[state] && delta[state][alphabet]) ? delta[state][alphabet].concat(epsilon_transacted_states) : epsilon_transacted_states;
        }));
	}, [initial_state]);
};

var getEpsilonStates = function(state, delta){
		var states_epsilon_transactions = (delta[state] && delta[state][epsilon])
				&& delta[state][epsilon] || [];
		return states_epsilon_transactions;
};

var getStatesAfterEpsilonTransaction = function (epsilon_states, alphabet,delta){
		var epsilon_transacted_states = epsilon_states.map(function(eps_state){
				return (delta[eps_state] && delta[eps_state][alphabet])
						&& delta[eps_state][alphabet] || [];
		});
		return _.flatten(epsilon_transacted_states);
};

var getEpsilonStatesFrom = function(states_for_final_candidate, delta){
		return states_for_final_candidate.map(function(final_state_candidate){
				return getEpsilonStates(final_state_candidate, delta);
		});
};

var isSubsetOf = function (subset_candidate, superSet){
		return subset_candidate.every(function(element){
			return superSet.indexOf(element) >= 0;
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


exports.NFA_Generator = NFA_Generator;

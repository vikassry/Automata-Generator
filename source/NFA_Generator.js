var _ = require("lodash");
var epsilon = "ε";

var NFA_Generator = function (states, alphabets, transition_function, initial_state, final_states){
	return function(input_text){
		if (!isValidString(input_text, alphabets)){
			throw ("Input is wrong!! Please provide input using ("+ alphabets.join(",")+ ") alphabets");
		}
		if(!isValidTransitionFunction(transition_function, states))
			throw ("Invalid Transition Function!!");

		if(!isValidFinalStates(final_states, states))
			throw ("Invalid Final states!!");

		var final_state_candidates =  reducer_state_for(input_text, transition_function, initial_state);
		epsilon_states_for_final_state_candidates = get_epsilon_states_for(final_state_candidates, transition_function);
		final_state_candidates = final_state_candidates.concat(_.flatten(epsilon_states_for_final_state_candidates));
		return hasFinalState(final_state_candidates, final_states);
	}
};

var hasFinalState = function (final_state_candidates, final_states){
		var final_states = _.intersection(final_state_candidates, final_states);
		return final_states.length > 0;
}

var reducer_state_for = function(input, transition_function, initial_state){
    if (input.length==0)
				return (transition_function[initial_state][epsilon]) ? transition_function[initial_state][epsilon] : [initial_state];

		return input.split('').reduce(function(states, alphabet, index) {
		    return _.flatten(states.map(function(state){
						var epsilon_states = get_epsilon_states(state,transition_function);
						var epsilon_transacted_states = get_states_after_epsilon_transaction(epsilon_states, alphabet,transition_function);
            return (transition_function[state] && transition_function[state][alphabet]) ? transition_function[state][alphabet].concat(epsilon_transacted_states) : epsilon_transacted_states;
        }));
	}, [initial_state]);
};

var get_epsilon_states = function(state, transition_function){
		var states_epsilon_transactions = (transition_function[state] && transition_function[state][epsilon])
				&& transition_function[state][epsilon] || [];
		return states_epsilon_transactions;
}

var get_states_after_epsilon_transaction = function (epsilon_states, alphabet,transition_function){
		var epsilon_transacted_states = epsilon_states.map(function(eps_state){
				return ((transition_function[eps_state]) && transition_function[eps_state][alphabet])
						&& transition_function[eps_state][alphabet] || [];
		});
		return _.flatten(epsilon_transacted_states);
};

var get_epsilon_states_for = function(states_for_fianl_candidate, transition_function){
		return states_for_fianl_candidate.map(function(final_state_candidate){
				return get_epsilon_states(final_state_candidate, transition_function);
		});
}

var isSubsetOf = function (subset_candidate, superSet){
		return subset_candidate.every(function(element){
			return superSet.indexOf(element) >= 0;
	});
};

var isValidString = function (input, all_alphabets){
		var uniq_input_alphabets =  (Array.isArray(input)) ? input : input.split('');
		return isSubsetOf(uniq_input_alphabets, all_alphabets);
};

var isValidTransitionFunction = function (transition_function, states){
		return isSubsetOf(Object.keys(transition_function), states);
};

var isValidFinalStates = function (final_states, states){
		return (final_states.length) ? isSubsetOf(final_states, states) : false;
};


exports.NFA_Generator = NFA_Generator;

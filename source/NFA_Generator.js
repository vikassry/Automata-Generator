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

		var state_for_input_string =  reducer_state_for(input_text, transition_function, initial_state);
    var result = _.intersection(state_for_input_string, final_states);
		return result.length > 0;
	}
};

var reducer_state_for = function(input, transition_function, initial_state){
    if (input.length==0){
			return (transition_function[initial_state][epsilon]) ? transition_function[initial_state][epsilon] : [initial_state];
		}
    return input.split('').reduce(function(states, alphabet, index) {
		    return _.flatten(states.map(function(state){
						var epsilon_transactions = get_epsilon_states_for(alphabet,state,transition_function);
            return (transition_function[state] && transition_function[state][alphabet]) ? transition_function[state][alphabet].concat(epsilon_transactions) : epsilon_transactions;
        }));
	}, [initial_state]);
};

var get_epsilon_states_for = function (alphabet, state, transition_function){
		var states_epsilon_transactions = (transition_function[state] && transition_function[state][epsilon]) ? transition_function[state][epsilon] : [];
		var epsilon_states = states_epsilon_transactions.map(function(eps_state){
				return ((transition_function[eps_state]) && transition_function[eps_state][alphabet]) && transition_function[eps_state][alphabet] || [];
		});
		return _.flatten(epsilon_states);
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

var isValidTransitionFunction = function (transition_function, states){
		return isSubsetOf(Object.keys(transition_function), states);
};

var isValidFinalStates = function (final_states, states){
		return (final_states.length) ? isSubsetOf(final_states, states) : false;
};


exports.NFA_Generator = NFA_Generator;

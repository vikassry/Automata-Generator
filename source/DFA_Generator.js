
var DFA_Generator = function (states, alphabets, transition_function, initial_state, final_states){

	return function(input_text){
		if (!isValidString(input_text, alphabets)){
			throw ("Invalid Input!! Please provide input using (" + alphabets.join(',')+ ") alphabets");
		}

		if(!isValidTransitionFunction(transition_function, states))
			throw ("Invalid Transition Function!!");

		if(!isValidFinalStates(final_states, states))
			throw ("Invalid Final states!!");

		var state_for_input_string =  reducer_state_for(input_text, transition_function, initial_state);
		return final_states.indexOf(state_for_input_string) >= 0;
	}
};


var reducer_state_for = function(input_text, transition_function, initial_state){
	return input_text.split('').reduce(function(state, alphabet){
		return transition_function[state][alphabet];
	}, initial_state);
};

var isSubsetOf = function (subset_candidate, superSet){
		return subset_candidate.every(function(element){
			return superSet.indexOf(element) >= 0;
	});
};

var isValidString = function (input, all_alphabets){
		var input_alphabets =  (Array.isArray(input)) ? input : input.split('');
		return isSubsetOf(input_alphabets, all_alphabets);
};

var isValidTransitionFunction = function (transition_function, states){
		return isSubsetOf(Object.keys(transition_function), states);
};

var isValidFinalStates = function (final_states, states){
		return (final_states.length) ? isSubsetOf(final_states, states) : false;
};


exports.DFA_Generator = DFA_Generator;

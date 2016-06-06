
var NFA_Generator = function (states, alphabets, transition_function, initial_state, final_states){

	return function(input_text){
		if (!isValidString(input_text, alphabets)){
			throw ("Input is wrong!! Please provide input using ("+ alphabets.join(",")+ ") alphabets");
		}

		if(!isValidTransitionFunction(transition_function, states))
			throw ("Invalid Transition Function!!");

		if(!isValidFinalStates(final_states, states))
			throw ("Invalid Final states!!");

		var state_for_input_string =  state_reducer(input_text, transition_function, initial_state);
		return final_states.indexOf(state_for_input_string) >= 0;
	}
};

var state_reducer = function(input_text, transition_function, initial_state){
	return input_text.split('').reduce(function(state, alphabet){
		return transition_function[state][alphabet];
	}, initial_state);
};


exports.NFA_Generator = NFA_Generator;

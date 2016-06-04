
var DFA_Generator = function (states, alphabets, transition_function, initial_state, final_states){

	return function(input_text){
		if (!isValidString(input_text, alphabets)){
			console.log("Input is wrong!! Please provide input using ("+ alphabets.join(",")+ ") alphabets");
			throw "Invalid Input";
		}

		if(!isValidTransitionFunction(transition_function, states))
			throw "Invalid Transition Function!!";

		if(!isValidFinalStates(final_states, states))
			throw "Invalid Final states!!";

		var state_for_input_string =  state_reducer(input_text, transition_function, initial_state);
		return final_states.indexOf(state_for_input_string) >= 0;
	}
};


var state_reducer = function(input_text, transition_function, initial_state){
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
	var uniq_input_alphabets =  (Array.isArray(input)) ? union(input) : union(input.split(''));
	return isSubsetOf(uniq_input_alphabets, all_alphabets);
};

var isValidTransitionFunction = function (transition_function, states){
	return isSubsetOf(Object.keys(transition_function), states);
};

var isValidFinalStates = function (final_states, states){
	return isSubsetOf(final_states, states);
};


var union = function(elements){
	return elements.reduce(function(prev, curr){
		(prev.indexOf(curr)<0) && prev.push(curr);
		return prev;
	},[]);
};




var divisible_by_2_transition = {
	'q1': {0:'q2', 1:'q2'},
	'q2': {0:'q3', 1:'q3'},
	'q3': {0:'q2', 1:'q2'}
}

var string_length_divisible_by_2 = DFA_Generator(['q1','q2','q3'], ['0','1'], divisible_by_2_transition, 'q1',['q1','q3']);
console.log(string_length_divisible_by_2(""));

exports.DFA_Generator = DFA_Generator;

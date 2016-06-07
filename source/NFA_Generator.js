var _ = require("lodash");

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
    var result = _.intersection(state_for_input_string, final_states);
		return result.length > 0;
	}
};

var state_reducer = function(input, transition_function, initial_state){
    if (input.length==0) return [initial_state];
    return input.split('').reduce(function(states, alphabet) {
		    return _.flatten(states.map(function(state){
            return transition_function[state][alphabet];
        }));
	}, [initial_state]);
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
		return (final_states.length) ? isSubsetOf(final_states, states) : false;
};


var union = function(elements){
	return elements.reduce(function(prev, curr){
		(prev.indexOf(curr)<0) && prev.push(curr);
		return prev;
	},[]);
};


exports.NFA_Generator = NFA_Generator;

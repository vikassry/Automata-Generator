var util = require('./utils.js');
var validateTuple = util.validateTuple;
var contains = util.contains;

var DFA_Generator = function (states, alphabets, transition_function, initial_state, final_states){
		return function(input_text){
				validateTuple(input_text, states, alphabets, transition_function, initial_state, final_states);
				var state_for_input_string = resolveState(input_text, transition_function, initial_state);
				return contains(state_for_input_string, final_states);
		}
};

var resolveState = function(input_text, transition_function, initial_state){
	console.log(input_text);
		return input_text.split('').reduce(function(state, alphabet){
			// console.log(transition_function[state]);
				return transition_function[state][alphabet];
		}, initial_state);
};

module.exports = DFA_Generator;

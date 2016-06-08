var assert = require('chai').assert;
var NFA_Generator = require('../source/NFA_Generator').NFA_Generator;

describe('NFA Generator', function() {
    describe(' lang w | w is string with length divisible by 2', function () {
        var lang = {
            states: ["q1","q2","q3"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:['q2'], 1:['q2']},
              'q2': {0:['q3'], 1:['q3']},
              'q3': {0:['q2'], 1:['q2']}
            },
            initial_state:"q1" ,
            final_states:['q1','q3']
        };
        var dfa_for_even_string_length = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string 00', function () {
            assert.equal(dfa_for_even_string_length('00'), true);
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_even_string_length(''));
        });
        it('should accept even length of string', function () {
            assert.ok(dfa_for_even_string_length('010110'));
        });
        it('should not accept single character', function () {
            assert.notOk(dfa_for_even_string_length('0'));
        });
        it('should not accept odd length of character', function () {
            assert.notOk(dfa_for_even_string_length('10101'));
        });
    });

    describe('lang w | w is string with length divisible by 2 or 3', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:['q2','q3'], 1:['q2','q3']},
              'q2': {0:['q4'], 1:['q4']},
              'q3': {0:['q5'], 1:['q5']},
              'q4': {0:['q2'], 1:['q2']},
              'q5': {0:['q6'], 1:['q6']},
              'q6': {0:['q3'], 1:['q3']}
            },
            initial_state:"q1" ,
            final_states:['q1','q4','q6']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });

    describe('lang w | w is string with length divisible by 2 or 3 | epsilon', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {'ε':['q2','q3']},
              'q2': {0:['q4'], 1:['q4']},
              'q3': {0:['q5'], 1:['q5']},
              'q4': {0:['q2'], 1:['q2']},
              'q5': {0:['q6'], 1:['q6']},
              'q6': {0:['q3'], 1:['q3']}
            },
            initial_state:"q1",
            final_states:['q2','q3']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });

    describe('lang w | w is string with length divisible by 2 or 3 |epsilon', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:['q2','q3'], 1:['q2','q3']},
              'q2': {0:['q4'], 1:['q4']},
              'q3': {0:['q5'], 1:['q5']},
              'q4': {0:['q2','q7'], 1:['q2'], 'ε':['q8']},
              'q5': {0:['q6'], 1:['q6']},
              'q6': {0:['q3'], 1:['q3'], 'ε':['q9','q10']}
            },
            initial_state:"q1" ,
            final_states:['q1','q8','q9','q10']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });
    describe("should pass for", function () {
        it('all binary strings that ends with 101', function () {
            var lang = {
                states: ["q1", "q2", "q3", "q4"],
                alphabets: ["1", "0"],
                transition_function: {
                    "q1": {"0": ["q1"], "1": ["q1", "q2"]},
                    "q2": {"0": ["q3"]},
                    "q3": {"1": ["q4"]},
                    "q4": {}
                },
                initial_state: "q1",
                final_states: ["q4"]
            };
            var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);;
            assert.isFalse(nfa("01"));
            assert.isTrue(nfa("101"));
            assert.isTrue(nfa("0101"));
            assert.isTrue(nfa("1101"));
        });

        it('strings ending with an even number of 1s or even number of 0s', function () {
            var lang = {
                states: ["q1", "q2", "q3", "q4", "q5"],
                alphabets: ["1", "0", "ε"],
                transition_function: {
                    "q1": {"ε": ["q2", "q4"]},
                    "q2": {"0": ["q3"], "1": ["q2"]},
                    "q3": {"0": ["q2"], "1": ["q3"]},
                    "q4": {"0": ["q4"], "1": ["q5"]},
                    "q5": {"0": ["q5"], "1": ["q4"]}
                },
                initial_state: "q1",
                final_states: ["q2", "q4"]
            };
            var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);;
            assert.isTrue(nfa("11"));
            assert.isTrue(nfa("00"));
            assert.isFalse(nfa("01"));
        });

        it('strings ending with 0', function () {
            var lang = {
                "states": ["q1", "q2", "q3", "q4"],
                "alphabets": ["0", "1", "ε"],
                "transition_function": {
                    "q1": {"ε": ["q2"]},
                    "q2": {"ε": ["q3"]},
                    "q3": {"0": ["q3", "q4"], "1": ["q3"]}
                },
                "initial_state": "q1",
                "final_states": ["q4"]

            };
            var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);;
            assert.isFalse(nfa("11"));
            // assert.isTrue(nfa("00"));
            // assert.isTrue(nfa("01110"));
        });

        it('1^n | n is even or divisible by 3', function () {
            var lang = {
                "states": ["q1", "q2", "q3", "q4", "q5", "q6"],
                "alphabets": ["1", "ε"],
                "transition_function": {
                    "q1": {"ε": ["q2", "q3"]},
                    "q2": {"1": ["q4"]},
                    "q3": {"1": ["q5"]},
                    "q4": {"1": ["q2"]},
                    "q5": {"1": ["q6"]},
                    "q6": {"1": ["q3"]},
                },
                "initial_state": "q1",
                "final_states": ["q2", "q3"]

            };
            var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);;
            assert.isTrue(nfa("11"));
            assert.isTrue(nfa("1111"));
            assert.isFalse(nfa("11111"));
        });


    });

});

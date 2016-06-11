var assert = require('chai').assert;
var NFA_Generator = require('../source/NFA_Generator').NFA_Generator;

describe('NFA Generator testing', function() {
    describe('language w | w is string with length divisible by 2', function () {
        var lang = {
            states: ["q1","q2","q3"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:['q2'], 1:['q2']},
              'q2': {0:['q3'], 1:['q3']},
              'q3': {0:['q2'], 1:['q2']}
            },
            initial_state:"q1",
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

    describe('language w | w is string with length divisible by 2 or 3', function () {
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

    describe('language w | w is string with length divisible by 2 or 3 | epsilon at entry', function () {
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

    describe('language w | w is string with length divisible by 2 or 3 |epsilon at end', function () {
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
            initial_state:"q1",
            final_states:['q1','q8','q9','q10']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('0011'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101011010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });
    describe('language w | w is string that ends with 101', function () {
        var lang = {
            states: ["q1", "q2", "q3", "q4"],
            alphabets: ["1", "0"],
            transition_function: {
              "q1": {"0": ["q1"], "1": ["q1", "q2"]},
              "q2": {"0": ["q3"]},
              "q3": {"1": ["q4"]}
            },
            initial_state: "q1",
            final_states: ["q4"]
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should not accept empty string', function () {
            assert.notOk(nfa(""));
        });
        it('should accept string 101', function () {
            assert.ok(nfa("101"));
        });
        it('should accept accept string ending with 101', function () {
            assert.ok(nfa("10101"));
        });
        it('should not accept string not ending with 101', function () {
            assert.notOk(nfa("01"));
            assert.notOk(nfa("01011"));
        });
    });

    describe('language w | w is string contains with an even number of 1s or even number of 0s', function () {
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
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string contains with an even number of 1s or os', function () {
            assert.ok(nfa("11"));
            assert.ok(nfa("010"));
            assert.ok(nfa("11110"));
        });
        it('should accept empty string', function () {
            assert.ok(nfa(""));
        });
        it('should not accept string containing odd number of 0s or 1s', function () {
            assert.notOk(nfa("010101"));
        });
        it('should not accept string containing even number of neither 1s nor 0s', function () {
            assert.notOk(nfa("01"));
        });
    });

    describe('language w | w is string that ends with 0', function () {
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
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept 0', function () {
            assert.notOk(nfa("11"));
            assert.ok(nfa("00"));
            assert.ok(nfa("01110"));
        });
        it('should accept string ending with 0', function () {
            assert.ok(nfa("00"));
            assert.ok(nfa("01110"));
        });
        it('should not accept string not ending with 0', function () {
            assert.notOk(nfa("11"));
            assert.notOk(nfa("011"));
        });
    });

    describe('language w | w is string abc', function () {
        var lang = {
            "states": ["q1", "q2", "q3", "q4", "q5", "q6"],
            "alphabets": ["a", "b", "c"],
            "transition_function": {

                "q1": {"a": ["q2"]},
                "q2": {"ε": ["q3"]},
                "q3": {"ε": ["q4"]},
                "q4": {"b": "q5"},
                "q5": {"c": "q6"}
            },
            "initial_state": "q1",
            "final_states": ["q6"]

        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept 0', function () {
            assert.ok(nfa("abc"));
        });
    });


    describe('language w | w is string such as (aaa)* ∪ b(ab)*', function () {
        var lang = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15"],
            alphabets: ['a', 'b'],
            transition_function: {
              'q1': {'ε': ['q2', 'q9']},
              'q2': {'ε': ['q3']},
              'q3': {'a': ['q4']},
              'q4': {'ε': ['q5']},
              'q5': {'a': ['q6']},
              'q6': {'ε': ['q7']},
              'q7': {'a': ['q8']},
              'q8': {'ε': ['q3']},
              'q9': {'b': ['q10']},
              'q10': {'ε': ['q11']},
              'q11': {'ε': ['q12']},
              'q12': {'a': ['q13']},
              'q13': {'ε': ['q14']},
              'q14': {'b': ['q15']},
              'q15': {'ε': ['q12']}
            },
            initial_state: "q1",
            final_states: ['q2', 'q8', 'q11', 'q15']
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept empty string', function () {
          assert.ok(nfa(''));
        });
        it('should accept b', function () {
          assert.ok(nfa('b'));
        });
        it('should accept any number of aaa (triple a)', function () {
          assert.ok(nfa('aaa'));
          assert.ok(nfa('aaaaaaaaa'));
        });
        it('should accept b follwed by any number of ab', function () {
          assert.ok(nfa("bab"));
          assert.ok(nfa("babababab"));
        });
        it('should not accept string with number of a not divisible by 3 ', function () {
          assert.notOk(nfa('aaaaaaa'));
        });
        it('should not accept string b not followed by ab', function () {
          assert.notOk(nfa('baba'));
        });
        it('should not accept string aaa followed by ab or b', function () {
          assert.notOk(nfa('aaaab'));
          assert.notOk(nfa('aaab'));
        });
    });

    describe('language w | w is string such as (ab ∪ ba)*', function () {
        var lang = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
            alphabets: ['a', 'b'],
            transition_function: {
              'q1': {'ε': ['q2']},
              'q2': {'ε': ['q3', 'q7']},
              'q3': {'a': ['q4']},
              'q4': {'ε': ['q5']},
              'q5': {'b': ['q6']},
              'q6': {'ε': ['q2']},
              'q7': {'b': ['q8']},
              'q8': {'ε': ['q9']},
              'q9': {'a': ['q10']},
              'q10': {'ε': ['q2']}
            },
            initial_state: "q1",
            final_states: ['q1', 'q6', 'q10']
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept ab', function () {
            assert.ok(nfa('ab'));
        });
        it('should accept ba', function () {
            assert.ok(nfa('ba'));
        });
        it('should accept alternate ab combination', function () {
            assert.ok(nfa('ababababab'));
        });
        it('should accept alternate ba combination', function () {
            assert.ok(nfa("babababa"));
        });
        it('should not accept alternate combination of ab or ba, starting and ending with same alphabet', function () {
            assert.notOk(nfa("babababab"));
            assert.notOk(nfa("abababaa"));
            assert.notOk(nfa('aaaaa'));
            assert.notOk(nfa('bbbbb'));
        });
        it('should not accept only one character', function () {
            assert.notOk(nfa('a'));
            assert.notOk(nfa('b'));
        });
    });

    describe('language w | w is string such (0*1* ∪ 1*0*) | 2 level ε', function () {
        var lang = {
            states:["q1","q3","q2","q5","q4","q6","q7"],
            alphabets:["1","0"],
            transition_function: {
              "q1":{"ε":["q2","q4"]},
              "q2":{"0":["q2"],"ε":["q3"]},
              "q3":{"1":["q3"]},
              "q4":{"1":["q4"],"ε":["q5"]},
              "q5":{"0":["q5"]}
            },
            initial_state:"q1",
            final_states:["q3","q5"]
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept 1 or 0', function () {
            assert.ok(nfa('1'));
            assert.ok(nfa('0'));
        });
        it('should accept 00 0r 11', function () {
            assert.ok(nfa('00'));
            assert.ok(nfa('11'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('110'));
            assert.ok(nfa("1100"));
            assert.ok(nfa('100'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('001'));
            assert.ok(nfa("0011"));
        });
        it('should not accept string starting and ending with same alhabet', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
        it('should not accept string where neither all 1s are followed by 0s nor all 0s followed by 1s ', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
    });

    describe('language w | w is string such as (0*1* ∪ 1*0*) | 3 level of ε', function () {
        var lang = {
            states:["q1","q3","q2","q5","q4","q6","q7"],
            alphabets:["1","0"],
            transition_function: {
              "q1":{"ε":["q2","q4"]},
              "q2":{"0":["q2"],"ε":["q3"]},
              "q3":{"1":["q3"],"ε":["q6"]},
              "q4":{"1":["q4"],"ε":["q5"]},
              "q5":{"0":["q5"],"ε":["q7"]}
            },
            initial_state:"q1",
            final_states:["q6","q7"]
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept 1 or 0', function () {
            assert.ok(nfa('1'));
            assert.ok(nfa('0'));
        });
        it('should accept 00 0r 11', function () {
            assert.ok(nfa('00'));
            assert.ok(nfa('11'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('110'));
            assert.ok(nfa("1100"));
            assert.ok(nfa('100'));
        });
        it('should accept any number of 1s after any number of 0s', function () {
            assert.ok(nfa('001'));
            assert.ok(nfa("0011"));
        });
        it('should not accept string starting and ending with same alhabet', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
        it('should not accept string where neither all 1s are followed by 0s nor all 0s followed by 1s ', function () {
            assert.notOk(nfa('101'));
            assert.notOk(nfa('010'));
            assert.notOk(nfa("00110"));
            assert.notOk(nfa("11001"));
        });
    });

    describe('language w | w is string that satisfies (ab)*(ba)* U aa*', function () {
        var lang = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"],
            alphabets: ['a', 'b'],
            transition_function: {
              'q1': {'ε': ['q2', 'q4']},
              'q2': {'a': ['q3']},
              'q3': {'a': ['q3']},
              'q4': {'a': ['q5'], 'ε': ['q6']},
              'q5': {'b': ['q6']},
              'q6': {'ε': ['q4', 'q7']},
              'q7': {'b': ['q8'], 'ε': ['q9']},
              'q8': {'a': ['q9']},
              'q9': {'ε': ['q7']}
            },
            initial_state: "q1",
            final_states: ['q3','q6','q9']
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it("should accept string that satisfies (ab)*(ba)* U aa*", function () {
            assert.ok(nfa("a"));
            assert.ok(nfa("aaa"));
            assert.ok(nfa("ab"));
            assert.ok(nfa("ba"));
            assert.ok(nfa("abba"));
        });
        it("should not accept string that does not satisfy (ab)*(ba)* U aa*", function () {
            assert.notOk(nfa("b"));
            assert.notOk(nfa("bb"));
            assert.notOk(nfa("bbb"));
            assert.notOk(nfa("bbab"));
            assert.notOk(nfa("abbb"));
        });
    });

    describe('language w | w is string that satisfies [ab] U (a*b* U b*a*) | multilevel epsilon at end', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6","q7"],
            alphabets: ['a','b'],
            transition_function: {
              "q1":{"a":["q2","q4"],"b":["q2","q4"]},
              "q2":{"a":["q2"],"ε":["q3"]},
              "q3":{"b":["q3"],"ε":["q6"]},
              "q4":{"b":["q4"],"ε":["q5"]},
              "q5":{"a":["q5"],"ε":["q6"]},
              "q6":{"ε":["q7"]}
            },
            initial_state: "q1",
            final_states: ['q7']
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it("should accept string that satisfies [ab] U (a*b* U b*a*)", function () {
            assert.ok(nfa("a"));
            assert.ok(nfa("b"));
            assert.ok(nfa("ab"));
            assert.ok(nfa("aa"));
            assert.ok(nfa("ba"));
            assert.ok(nfa("bb"));
            assert.ok(nfa("abba"));
            assert.ok(nfa("aba"));
            assert.ok(nfa("baab"));
            assert.ok(nfa("abaa"));
            assert.ok(nfa("bab"));
            assert.ok(nfa("babb"));
            assert.ok(nfa("baabb"));
            assert.ok(nfa("abbaa"));
        });
        it("should not accept string that does not satisfy [ab] U (a*b* U b*a*)", function () {
            assert.notOk(nfa(""));
            assert.notOk(nfa("abab"));
            assert.notOk(nfa("baba"));
            assert.notOk(nfa("bbaaba"));
            assert.notOk(nfa("aabbaa"));
        });

    });

});

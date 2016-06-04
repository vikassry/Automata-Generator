var assert = require('chai').assert;
var DFA_Generator = require('../source/DFA_Generator').DFA_Generator;

describe('DFA Generator', function() {
    describe('Language w | w is string with length divisible by 2', function () {

      var lang = {
          states: ["q1","q2","q3"],
          alphabets : ['0','1'],
          transition_function:{
            'q1': {0:'q2', 1:'q2'},
            'q2': {0:'q3', 1:'q3'},
            'q3': {0:'q2', 1:'q2'}
          },
          initial_state:"q1" ,
          final_states:['q1','q3']
      };
      var dfa_for_even_string_length = DFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string 00', function () {
            assert.ok(dfa_for_even_string_length('00'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_even_string_length('00'));
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
});

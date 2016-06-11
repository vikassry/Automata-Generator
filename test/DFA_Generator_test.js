var assert = require('chai').assert;
var DFA_Generator = require('../source/DFA_Generator');

describe('DFA Generator testing', function() {
    describe('language w | w is string with length divisible by 2', function () {
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

    describe('language w | w is string with length greater than 3 and has 1 as 3rd alphabet', function(){
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:'q2', 1:'q2'},
              'q2': {0:'q3', 1:'q3'},
              'q3': {0:'q6', 1:'q4'},
              'q4': {0:'q5', 1:'q5'},
              'q5': {0:'q5', 1:'q5'},
              'q6': {0:'q6', 1:'q6'}
            },
            initial_state:"q1" ,
            final_states:['q5']
      };
      var dfa = DFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

      it('should accept string with 1 as 3rd alpabet and with length greater than 3', function () {
          assert.ok(dfa("0010"));
          assert.ok(dfa("10100101"));
      });
      it('should not accept empty string', function () {
          assert.notOk(dfa(""));
      });
      it('should not accept string upto length 3', function () {
          assert.notOk(dfa("10"));
      });
      it('should not accept string with 1 as 3rd alpabet', function () {
          assert.notOk(dfa("111"));
      });
    });

  });

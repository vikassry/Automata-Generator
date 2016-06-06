var assert = require('chai').assert;
var NFA_Generator = require('../source/NFA_Generator').NFA_Generator;

describe('NFA Generator', function() {
    describe('Language w | w is string with length divisible by 2 or 3', function () {
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
        final_states:['q4','q6']
      };
      var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

      it('should accept string 00', function () {
          // assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
      });
    });

  });

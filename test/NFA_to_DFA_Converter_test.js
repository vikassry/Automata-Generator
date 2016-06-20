var assert = require('chai').assert;
var findCombinations = require('../source/nfa_to_dfa_converter.js').findCombinations;
var get_combination = require('../source/nfa_to_dfa_converter.js').get_combination;
var NFA_to_DFA_converter = require('../source/nfa_to_dfa_converter.js').NFA_to_DFA_converter;
var findInitialState = require('../source/nfa_to_dfa_converter.js').findInitialState;
var findFinalStates = require('../source/nfa_to_dfa_converter.js').findFinalStates;
var convertNfaTransitionToDfa = require('../source/nfa_to_dfa_converter.js').convertNfaTransitionToDfa;


describe('NFA To DFA Converter testing', function(){

    describe('findCombinations', function(){
        it('should give all combinations for given set of elements', function(){
            var combinations = [ 1,2,3,4,[ 1, 2 ],[ 1, 3 ],[ 1, 4 ],
                            [ 1, 2, 3 ],[ 1, 2, 4 ],[ 1, 2, 3, 4 ],
                            [ 1, 3, 4 ],[ 2, 3 ],[ 2, 4 ],[ 2, 3, 4 ],[ 3, 4 ]];
            assert.deepEqual(findCombinations([1,2,3,4]), combinations);
        });

        it('should give empty set of empty set of elements', function(){
            assert.deepEqual(findCombinations([]),[]);
        });

        it('should give combinations for small set of elements without join', function(){
            assert.deepEqual(findCombinations([1,2]), [1,2,[1,2]]);
        });

        it('should give joined combinations set of elements ', function(){
            assert.deepEqual(findCombinations([1,2],true), [1,2,'1,2']);
        });
    });

    describe('get_combination', function(){
        it('should give first set of combinations for set of elements', function(){
            var combinations = [ [ 1, 2 ],[ 1, 3 ],[ 1, 4 ],
                                [ 1, 2, 3 ],[ 1, 2, 4 ],[ 1, 2, 3, 4 ],
                                [ 1, 3, 4 ] ];
            var result = [];
            get_combination([1],[2,3,4],result);
            assert.deepEqual(result, combinations);
        });

        it('should give empty set of empty set of elements', function(){
            var result = [];
            get_combination([],[], result);
            assert.deepEqual(result,[]);
        });

        it('should give first set of combinations for set of elements', function(){
            var result = [];
            get_combination([1],[2],result, true);
            assert.deepEqual(result, ['1,2']);
        });

        it('should give first set of joined combinations for set of elements', function(){
            var result = [];
            get_combination([1],[2],result, true);
            assert.deepEqual(result, ['1,2']);
        });
    });

    describe('findInitialState', function() {
        it('should give initial state q1 when NFA with only q1 as initial state', function (){
          var delta = {
            'q1': {0:['q2'], 1:['q2']},
            'q2': {0:['q3'], 1:['q3']},
            'q3': {0:['q2'], 1:['q2']}
          };
          var initial_state = "q1";
          assert.equal(findInitialState(initial_state, delta), 'q1');
        });

        it('should give multiple initial states when NFA with epsilon on initial state', function (){
          var delta = {
              '1': {'ε': ['2', '4']},
              '2': {'a': ['3']},
              '3': {'a': ['3']},
              '4': {'a': ['5'], 'ε': ['6']},
              '5': {'b': ['6']},
              '6': {'ε': ['4', '7']},
              '7': {'b': ['8'], 'ε': ['9']},
              '8': {'a': ['9']},
              '9': {'ε': ['7']}
          }
          var initial_state = "1";
          assert.equal(findInitialState(initial_state, delta), '1,2,4,6,7,9');
        });

        it('should give multiple initial states when NFA with epsilon on initial state', function (){
            var delta = {
                'q1': {'ε':['q2','q3']},
                'q2': {0:['q4'], 1:['q4']},
                'q3': {0:['q5'], 1:['q5']},
                'q4': {0:['q2'], 1:['q2']},
                'q5': {0:['q6'], 1:['q6']},
                'q6': {0:['q3'], 1:['q3']}
            };
            var initial_state = "q1";
            assert.deepEqual(findInitialState(initial_state, delta), 'q1,q2,q3');
        });
    });

    describe('findFinalStates', function() {
        it('should give final state q3 when NFA with q3 as final state and without epsilons', function (){
          var all_combination = ['1','2','3','1,2','1,2,3','2,3'];
          var nfa_final_states = ['1','3'];
          assert.deepEqual(findFinalStates(nfa_final_states, all_combination), ['1','3','1,2','1,2,3','2,3']);
        });

        it('should give empty list when no final state', function (){
          var all_combination = ['1','2','3','1,2','1,2,3','2,3'];
          var nfa_final_states = [];
          assert.deepEqual(findFinalStates(nfa_final_states, all_combination), []);
        });
    });

    describe('convert', function() {
        it('should conver NFA transition without epsilons  table to DFA transitions', function (){
          var NFA_transitions = {
              'q1': {'0':['q2'], '1':['q2']},
              'q2': {'0':['q3'], '1':['q3']},
              'q3': {'0':['q2'], '1':['q2']}
          };
          var DFA_transitions = {
              'q1':   { '0': 'q2', '1': 'q2' },
              'q2':   { '0': 'q3', '1': 'q3' },
              'q3':   { '0': 'q2', '1': 'q2' },
              'q1,q2':{ '0': 'q2,q3', '1': 'q2,q3' },
              'q1,q3':{ '0': 'q2', '1': 'q2' },
              'q2,q3':{ '0': 'q2,q3', '1': 'q2,q3' },
              'q1,q2,q3': { '0': 'q2,q3', '1': 'q2,q3' }
          };
          // {
          //     'q1': {'0':'q2', '1':'q2'},    After removing unecessary transitions (states)
          //     'q2': {'0':'q3', '1':'q3'},
          //     'q3': {'0':'q2', '1':'q2'}
          // };
          var all_combinations = findCombinations(['q1','q2','q3'], true);
          var result = convertNfaTransitionToDfa(all_combinations, ['0','1'], NFA_transitions);
          assert.deepEqual(result, DFA_transitions);
        });
    });




});

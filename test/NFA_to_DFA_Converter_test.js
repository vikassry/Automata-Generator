var assert = require('chai').assert;
var find_combinations = require('../source/nfa_to_dfa_converter.js').find_combinations;
var get_combination = require('../source/nfa_to_dfa_converter.js').get_combination;
var NFA_to_DFA_converter = require('../source/nfa_to_dfa_converter.js').NFA_to_DFA_converter;


describe('NFA To DFA Converter testing', function(){
    describe('find_combinations', function(){
        it('should give all combinations for given set of elements', function(){
            var combinations = [ 1,2,3,4,[ 1, 2 ],[ 1, 3 ],[ 1, 4 ],
                            [ 1, 2, 3 ],[ 1, 2, 4 ],[ 1, 2, 3, 4 ],
                            [ 1, 3, 4 ],[ 2, 3 ],[ 2, 4 ],[ 2, 3, 4 ],[ 3, 4 ]];
            assert.deepEqual(find_combinations([1,2,3,4]), combinations);
        });

        it('should give empty set of empty set of elements', function(){
            assert.deepEqual(find_combinations([]),[]);
        });

        it('should give empty set of empty set of elements', function(){
            assert.deepEqual(find_combinations([1,2]), [1,2,[1,2]]);
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
            get_combination([1],[2],result);
            assert.deepEqual(result, [[1,2]]);
            var lang = {
                states: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                alphabets: ['a', 'b'],
                delta: {
                  '1': {'ε': ['2', '4']},
                  '2': {'a': ['3']},
                  '3': {'a': ['3']},
                  '4': {'a': ['5'], 'ε': ['6']},
                  '5': {'b': ['6']},
                  '6': {'ε': ['4', '7']},
                  '7': {'b': ['8'], 'ε': ['9']},
                  '8': {'a': ['9']},
                  '9': {'ε': ['7']}
                },
                initial_state: "1",
                final_states: ['3','6','9']
            };
            NFA_to_DFA_converter(lang);
        });
    });
});

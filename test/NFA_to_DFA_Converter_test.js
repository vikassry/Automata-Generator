var find_combinations = require('../source/nfa_to_dfa_converter.js').find_combinations;
var get_combination = require('../source/nfa_to_dfa_converter.js').get_combination;
var assert = require('chai').assert;


describe('NFA To DFA Converter', function(){
    describe('find_combinations', function(){
        it('should give all combinations for given set of elements', function(){
            var combinations = [ 1,2,3,4,[ 1, 2 ],[ 1, 3 ],[ 1, 4 ],
                                  [ 1, 2, 3 ],[ 1, 2, 4 ],[ 1, 2, 3, 4 ],
                                  [ 1, 3, 4 ],[ 2, 3 ],[ 2, 4 ],[ 2, 3, 4 ],[ 3, 4 ]
                              ];
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
                                  [ 1, 3, 4 ]
                              ];
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
        });
    });
});

/**
 * Resources:
 * 
 *	http://www.functionaljavascript.com/
 * 
 *  Chapter 1.
 *
 */
define(["chai"], function(Chai) {

    'use strict';

    var GLOBAL_OBJECT = window,
        //should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,
        Suite = {
            name: "Functional programming with JavaScript. Chapter 1, Introducing Functional JavaScript.",
            tests: []
        };

    //Abstraction for failure
    function fail(thing) {
        throw new Error(thing);
    }

    //Abstraction for notification
    function note(thing) {
        console.log(['NOTE:', thing].join(' '));
    }

    //Abstraction for warning
    function warn(thing) {
        return (['WARN:', thing].join(' '));
    }

    //Distinguish between null, undefined and everything else
    function existy(x) {
        return x != null;
    }
    
    //There are 5 falsy values in JS. With this method 0 and '' are considered truthy.
    function truthy(x) {
        return (x !== false && existy(x));
    } 

    //Abstraction for checking is it an indexed data or not
    function isIndexed(data) {
        return _.isArray(data) || _.isString(data);
    }

    //Abstraction for array indexing behaviour
    //This abstraction is built on top of other abstractions
    function nth(a, index) {
        if (!_.isNumber(index)) {
            fail('Expected a number as the index');
        }
        if (!isIndexed(a)) {
            fail('Not supported on non-indexed type');
        }
        if (index < 0 || index > a.length - 1) {
            fail('Index value is out of bounds');
        }
        return a[index];
    }

    //Abstraction over nth abstraction - return second element of an array
    function second(a) {
        return nth(a, 1);
    }


    Suite.tests.push({
        name: "JavaScript has flexible execution model - array could be turned to function arguments - example apply",
        body: function() {

            function splat(fun) {
                return function(array) {
                    //Array elements becomes arguments to the 'fun' function
                    return fun.apply(null, array);
                };
            }

            var addArrayElements = splat(function(x, y) {
                return x + y
            });

            assert.equal(addArrayElements([1, 2]), 3);
        }
    });

    Suite.tests.push({
        name: "JavaScript has flexible execution model - function called with different number of arguments - example call",
        body: function() {

            function unsplat(fun) {
                return function() {
                    return fun.call(null, _.toArray(arguments));
                };
            }

            var joinElements = unsplat(function(array) {
                return array.join(' ')
            });

            assert.equal(joinElements(1, 2), '1 2');
            assert.equal(joinElements('-', '$', '/', '!', ":"), '- $ / ! :');
        }
    });

    Suite.tests.push({
        name: "Identifying an abstraction and building a function for it -> abstract implementation details",
        body: function() {

            function parseAge(age) {
                if (!_.isString(age)) {
                    //Abstracting fail behavior with function
                    fail('Expecting a string');
                }
                var a;

                //Abstracting notification behavior with function
                note('Attempting to parse an age...');

                a = parseInt(age, 10);
                if (_.isNaN(a)) {

                    //Abstracting warning behavior with function
                    warn(['Could not parse age:', age].join(' '));
                    a = 0;
                }

                return a;
            }

            assert.equal(parseAge('42'), 42);
            assert.equal(parseAge('NotANumber'), 0);
        }
    });

    Suite.tests.push({
        name: "Identifying an abstraction and building a function for it -> abstract basic units of behavior - example array indexing",
        body: function() {


            var letters = ['a', 'b', 'c'],
                function1 = function() {
                    nth({}, 2);
                },
                function2 = function() {
                    nth(letters, 4000);
                },
                function3 = function() {
                    nth(letters, 'aaaaaa');
                },
                function4 = function() {
                    second({})
                };

            assert.equal(nth(letters, 1), 'b');
            assert.equal(nth('abc', 0), 'a');
            expect(function1).to.throw ('Not supported on non-indexed type');
            expect(function2).to.throw ('Index value is out of bounds');
            expect(function3).to.throw ('Expected a number as the index');

            assert.equal(second('ab'), 'b');
            assert.equal(second('fogus'), 'o');
            expect(function4).to.
            throw ('Not supported on non-indexed type');
        }
    });

    Suite.tests.push({
        name: "Identifying an abstraction and building a function for it -> abstract basic units of behavior - example comparator",
        body: function() {
            var initial1 = [2, 3, -6, 0, -108, 42],
                expected1 = [-108, -6, 0, 2, 3, 42],
                //Built in method - no argument version is doing string comparison
                sorted1 = initial1.sort(),
                
                initial2 = [2, 3, -1, -6, 0, -108, 42, 10],
                expected2 = [-1, - 108, -6, 0, 10, 2, 3, 42],
                //This is not going to work due to string comparison
                sorted2 = initial2.sort(),
                
                initial3 = [2, 3, -1, -6, 0, -108, 42, 10],
                expected3 = [-108, -6, -1, 0, 2, 3, 10, 42],
                //Built in method - argument version is using the argument to do comparison - so this will work
                sorted3 = initial3.sort(compareLessThanOrEqual),
                
                initial4 = [2, 3, -1, -6, 0, -108, 42, 10],
                expected4 = [42, 10, 3, 2, 0, -1, -6, -108],
                //Using predicate will not work so we need predicate - comparator transformation
                sorted4 = initial4.sort(lessOrEqual),

                initial5 = [2, 3, -1, -6, 0, -108, 42, 10],
                expected5 = [-108, -6, -1, 0, 2, 3, 10, 42],
                //Built in method - argument version is using the argument to do comparison - so this will work
                sorted5 = initial5.sort(comparator(lessOrEqual));

            //Abstraction for comparators
            function compareLessThanOrEqual(x, y) {
                if (x < y) return -1;
                if (y < x) return 1;
                return 0;
            }
            //Predicate (return true or false) are preffered
            function lessOrEqual(x, y) {
                return x <= y;
            }
            
            //Return comparator function out of predicate function
            function comparator(pred) {
                return function(x, y) {
                    if (truthy(pred(x, y))) {
                        return -1;
                    } else if (truthy(pred(y, x))) {
                        return 1;
                    } else {
                        return 0;
                    }
                };
            }

            for (var i = 0; i < sorted1.length; i++) {
                assert.equal(expected1[i], sorted1[i]);
            }

            for (i = 0; i < sorted2.length; i++) {
                assert.equal(expected2[i], sorted2[i]);
            }

            for (i = 0; i < sorted3.length; i++) {
                assert.equal(expected3[i], sorted3[i]);
            }

            for (i = 0; i < sorted4.length; i++) {
                assert.equal(expected4[i], sorted4[i]);
            }

            for (i = 0; i < sorted5.length; i++) {
                assert.equal(expected5[i], sorted5[i]);
            }

        }
    });

    Suite.tests.push({
        name: "Build data abstractions - arrays and objects could be pretty enough?",
        body: function() {
            function lameCSV(str) {
                return _.reduce(
                            str.split('\n'), 
                            function(table, row) {
                                table.push(
                                    //Return the trimmed content of each element
                                    _.map(
                                        row.split(','), 
                                        function(c) {
                                            return c.trim();
                                        }
                                    )
                                );
                                return table;
                            },
                            []
                        );
            }
            
            var peopleTable = lameCSV("name,age,hair\nMerble,35,red\nBob,64,blonde");
            assert.equal(peopleTable[0][0], 'name');
            assert.equal(peopleTable[0][1], 'age');
            assert.equal(peopleTable[0][2], 'hair');
            assert.equal(peopleTable[1][0], 'Merble');
            assert.equal(peopleTable[1][1], '35');
            assert.equal(peopleTable[1][2], 'red');
            assert.equal(peopleTable[2][0], 'Bob');
            assert.equal(peopleTable[2][1], '64');
            assert.equal(peopleTable[2][2], 'blonde');
            
            var sortedPeople = _.rest(peopleTable).sort();
            
            assert.equal(sortedPeople[0][0], 'Bob');
            assert.equal(sortedPeople[0][1], '64');
            assert.equal(sortedPeople[0][2], 'blonde');
            assert.equal(sortedPeople[1][0], 'Merble');
            assert.equal(sortedPeople[1][1], '35');
            assert.equal(sortedPeople[1][2], 'red');
            
            function selectNames(table) {
                return _.rest(_.map(table, _.first));
            }
            
            function selectAges(table) {
                return _.rest(_.map(table, second));
            }
            
            function selectHairColor(table) {
                return _.rest(_.map(table, function(row){
                    return nth(row, 2);
                }));
            }
            
            var names = selectNames(peopleTable),
                ages = selectAges(peopleTable),
                hairColors = selectHairColor(peopleTable);
                
            assert.equal(names[0], 'Merble');
            assert.equal(names[1], 'Bob');
            assert.equal(ages[0], '35');
            assert.equal(ages[1], '64');
            assert.equal(hairColors[0], 'red');
            assert.equal(hairColors[1], 'blonde');
        }
    });

    Suite.tests.push({
        name: "A taste of functional JavaScript - example with forEach",
        body: function() {
            //The built in forEach
            [0, 1, 2].forEach(function(number, index) {
                assert.equal(number, index);
            });
        }
    });


    Suite.tests.push({
        name: "A taste of functional JavaScript - example with truthy and existy",
        body: function() {
            //Array object has method 'reverse'
            assert.isTrue(existy([1,2,3]['reverse']));
            
            function doWhen(cond, action) {
                if (truthy(cond)) {
                    return action();
                } else {
                    return undefined;
                }
            }
            
            function executeIfHasField(target, name) {
                return doWhen(existy(target[name]), function() {
                    return _.result(target, name);
                });
            }
            
            var reversed = executeIfHasField([1,2,3], 'reverse');
            
            assert.equal(reversed[0], 3);
            assert.equal(reversed[1], 2);
            assert.equal(reversed[2], 1);
            assert.equal(executeIfHasField({foo: 42}, 'foo'), 42);
            assert.isUndefined(executeIfHasField([1,2,3], 'notHere'));
            
            //Now that is functional programming
            var checkForExistence = [null, undefined, 1, 2, false],
                checkForTruthy = [null, undefined, false, 0, '', 1, 2],
                checkedForExistance = checkForExistence.map(existy),
                checkedForTruthy = checkForTruthy.map(truthy);
            
            assert.isFalse(checkedForExistance[0]);
            assert.isFalse(checkedForExistance[1]);
            assert.isTrue(checkedForExistance[2]);
            assert.isTrue(checkedForExistance[3]);
            assert.isTrue(checkedForExistance[4]);
            
            assert.isFalse(checkedForTruthy[0]);
            assert.isFalse(checkedForTruthy[1]);
            assert.isFalse(checkedForTruthy[2]);
            assert.isTrue(checkedForTruthy[3]);
            assert.isTrue(checkedForTruthy[4]);
            assert.isTrue(checkedForTruthy[5]);
            assert.isTrue(checkedForTruthy[6]);
            
        }
    });

return Suite;
});

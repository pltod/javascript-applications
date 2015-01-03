/**
 * Resources:
 * 
 *    http://www.functionaljavascript.com/
 * 
 *  Chapter 2.
 *
 */
define(["chai"], function(Chai) {

    'use strict';

    var GLOBAL_OBJECT = window,
        //should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,
        Suite = {
            name: "Functional programming with JavaScript. Chapter 2, First-class functions and applicative programming.",
            tests: []
        };


    //Distinguish between null, undefined and everything else
    function existy(x) {
        return x != null;
    }

    //There are 5 falsy values in JS. With this method 0 and '' are considered truthy.
    function truthy(x) {
        return (x !== false && existy(x));
    } 

    //Non applicative version - take arguments and concatenates them
    function cat() {
        var head = _.first(arguments);
        if (existy(head)) {
            //apply is taking the array and pass each element as concat argument
            return head.concat.apply(head, _.rest(arguments));                    
        } else {
            return [];
        }
    }
    
    //Still not applicative because it just uses cat but not receive it as parameter
    function construct(head, tail) {
        return cat([head], _.toArray(tail)); 
    }

    // We need SELECT statement in the form of function
    function project(table, keys) {
        return _.map(table, function(obj) { 
                return _.pick.apply(null, construct(obj, keys));
            });
    }

    //Renames keys based on a given criteria map    
    function rename(obj, newNames) {
        return _.reduce(newNames, 
                        function(o, nu, old) {
                            if (_.has(obj, old)) {
                                o[nu] = obj[old];
                                return o;
                            }
                            else
                                return o;
                        },
                        _.omit.apply(null, construct(obj, _.keys(newNames)))
        );
    }

    function as(table, newNames) {
        return _.map(table, function(obj) {
            return rename(obj, newNames);
        });
    } 

    Suite.tests.push({
        name: "A functional programming language is one facilitating the use and creation of first-class functions.",
        body: function() {
            
            //Functions as variable, array element and object property
            var fortyTwoVar = function() { return 42; },
                fortyTwoArray = [42, function() { return 42; }],
                fortyTwoObject = {number: 42, fun: function() { return 42; }};
                
            assert.isFunction(fortyTwoVar);
            assert.isFunction(fortyTwoArray[1]);
            assert.isFunction(fortyTwoObject.fun);
            
            //Function created and executed on the fly
            assert.equal(42 + function() { return 42; }(), 84);
        }
    });


    Suite.tests.push({
        name: "Higher-order functions - those that recieve function as arguments or those that return function as result",
        body: function() {
            
            function weirdAdd(n, f) { 
                return n + f();
            }
            
            
            //Receive function as argument
            assert.equal(weirdAdd(42, function() { return 42; } ), 84);
            
            
            //Return function
            _.each(['whiskey', 'tango', 'foxtrot'], function(word, index) {
                if (index === 0) {
                    assert.equal(word.charAt(0).toUpperCase() + word.substr(1), 'Whiskey');
                }
                else if (index === 1) {
                    assert.equal(word.charAt(0).toUpperCase() + word.substr(1), 'Tango');
                }
                else if (index === 2)
                    assert.equal(word.charAt(0).toUpperCase() + word.substr(1), 'Foxtrot');
            })


            //Returned as value
            function a () { 
                return function() { 
                    return 42; 
                };
            }
            assert.equal(a()(), 42);
        }
    });

    Suite.tests.push({
        name: "Imperative programming style. Bottles of beers example.",
        body: function() {
            
            var lyrics = [];
            
            for (var bottles = 99; bottles > 0; bottles--) {
                lyrics.push(bottles + ' bottles of beers on the wall');
                lyrics.push(bottles + ' bottles of beer');
                lyrics.push('Take one down, pass it around');
                
                if (bottles > 1) {
                    lyrics.push((bottles - 1) + ' bottles of beers on the wall');
                }
                else {
                    lyrics.push('No more bottles of beer on the wall!');
                }
            }
            assert.equal(lyrics.length, 396);
        }
    });

    Suite.tests.push({
        name: "Functional programming style. Bottles of beers example.",
        body: function() {
            
            //Consider this domain logic
            function lyricSegment(n) {
                return _.chain([])
                        .push(n + ' bottles of beers on the wall')
                        .push(n + ' bottles of beer')
                        .push('Take one down, pass it around')
                        .tap(function(lyrics) {
                            if (n > 1) {
                                lyrics.push((n - 1) + ' bottles of beers on the wall');
                            }
                            else {
                                lyrics.push('No more bottles of beers on the wall!');
                            }
                        })
                        .value();
            }
            
            //Consider this assembly machine for combining domain logic
            function song(start, end, lyricGen) {
                return _.reduce(_.range(start, end, -1), function(acc, n) {
                    return acc.concat(lyricGen(n));
                }, []);
            }
            
            assert.equal(song(99, 0, lyricSegment).length, 396);
        }
    });

    Suite.tests.push({
        name: "Prototype-based OOP. Self-reference semantics conflict with the notion of functional programming.",
        body: function() {
            var a = {
                    name: 'a',
                    fun: function() { return this; }
                },
                bFunc = a.fun;
                
            assert.equal(a.fun(), a);
            
            //Here is the conflict - we lose the context depending on the invocation type
            assert.notEqual(bFunc(), a);
        }
    });

    Suite.tests.push({
        name: "Metaprogramming - changes the way something is interpreted.",
        body: function() {
            
            function Point2D(x, y) {
                this._x = x;
                this._y = y;
            }
            
            function Point3D(x, y, z) {
                
                //Metaprogramming with dynamically bind this
                Point2D.call(this, x, y);
                this._z = z;
            }
            
            var point2D = new Point2D(0, 1),
                point3D = new Point3D(10, -1, 100);
                
            assert.equal(point2D._x, 0);
            assert.equal(point2D._y, 1);
            
            assert.equal(point3D._x, 10);
            assert.equal(point3D._y, -1);
            assert.equal(point3D._z, 100);
        }
    });
    
    Suite.tests.push({
        name: "Applicative functions - examples with map, reduce and filter",
        body: function() {

            function doubleAll(array) {
                return _.map(array, function(n) { return n*2; } );
            }
            
            function average(array) {
                var sum = _.reduce(array, function(a, b) { return a+b; } );
                return sum / _.size(array);
            }
            
            function onlyEven(array) {
                return _.filter(array, function(n) {
                    return (n%2) === 0;
                });
            }
            
            var nums = [1, 2, 3],
                resultMap = doubleAll(nums),
                resultReduce = average(nums),
                resultFilter = onlyEven(nums);
            
            _.map(resultMap, function(n, index) { 
                
                    if (index === 0 ) {
                        assert.equal(n, 2)
                    } else if (index == 1) {
                        assert.equal(n, 4)
                    } else if (index == 2) {
                        assert.equal(n, 6)
                    } 
                
                } );

            assert.equal(resultReduce, 2);
            assert.equal(resultFilter[0], 2);
            
        }
    });    

    Suite.tests.push({
        name: "Applicative functions - examples with reduceRight",
        body: function() {

            var nums = [100, 2, 25];
            
            function div(x, y) {
                return x/y;
            }
            
            assert.equal(_.reduce(nums, div), 2);
            
            //Process elements from right to left
            assert.equal(_.reduceRight(nums, div), 0.125);
            
            function allOf() {
                return _.reduceRight(arguments, function(truth, f) {
                    return truth && f();
                }, true);
            }
            
            function anyOf() {
                return _.reduceRight(arguments, function(truth, f) {
                    return truth || f();
                }, false);
            }
            
            function T() { return true; }
            function F() { return false; }
            
            //true, no arguments and the callback function is not executed at all
            assert.isTrue(allOf());
            
            //false, no arguments and the callback function is not executed at all
            assert.isFalse(anyOf());
            
            assert.isTrue(allOf(T, T));
            assert.isTrue(anyOf(T, T, F));
            
            assert.isFalse(allOf(T, T, T, T, F));
            
            assert.isFalse(anyOf(F, F, F, F));
            
        }
    });    

    Suite.tests.push({
        name: "Applicative functions - example with find",
        body: function() {
            
            assert.equal(_.find(['a', 'b', 3, 'd'], _.isNumber), 3);
            
        }
    });    
    
    Suite.tests.push({
        name: "Applicative functions - example with reject",
        body: function() {
            
            
            var initial = ['a', 'b', 3, 'd'],
                result = _.reject(initial, _.isNumber);
            
            assert.isTrue(_.contains(initial, 3));
            assert.isFalse(_.contains(result, 3));
            
            //reject is opposite to filter - we can use filter in similar manner if we reverse the predicate logic
            //example with complement function
            function complement(pred) {
                return function() {
                    return !pred.apply(null, _.toArray(arguments));    
                };
            }
            
            assert.isFalse(_.contains(_.filter(initial, complement(_.isNumber)), 3));
        }
    });    

    Suite.tests.push({
        name: "Applicative functions - example with all",
        body: function() {
            
            assert.isTrue(_.all([1, 2, 3, 4], _.isNumber));
        }
    });    

    Suite.tests.push({
        name: "Applicative functions - example with any",
        body: function() {
            
            assert.isTrue(_.any([1, 2, 'c', 4], _.isString));
        }
    });    
    
    
    Suite.tests.push({
        name: "Applicative functions - examples with sortBy, groupBy, countBy",
        body: function() {
            
            //these functions perform actions of the result returned by criteria function
            var people = [{name: 'Rick', age: 30}, {name: 'Jaka', age: 24}, {name: 'Rick', age: 28}];
            
            var sortedByAge = _.sortBy(people, function(p) { return p.age; });
            assert.equal(sortedByAge[0].name, 'Jaka');
            
            var groupedBy = _.groupBy(people, function(p) { return p.name; });
            assert.equal(groupedBy.Rick.length, 2);
            assert.equal(groupedBy.Jaka.length, 1);
            
            var countedBy = _.countBy(people, function(p) { return p.name; });
            assert.equal(countedBy.Rick, 2);
            assert.equal(countedBy.Jaka, 1);
            
            
        }
    });        

    Suite.tests.push({
        name: "Key facet of functional programming - gradual definition and use of discrete functionality built from lower level functions",
        body: function() {
            
            // = > [1, 2, 3, 4, 5, 6, 7, 8]
            assert.equal(cat([ 1,2,3], [4,5], [6,7,8]).length, 8);
            
            
            // = > [42, 1, 2, 3]
            assert.equal(construct(42, [1, 2, 3]).length, 4);
            
            //Applicative since receive function as argument
            function mapcat(fun, coll) {
                return cat.apply(null, _.map(coll, fun));
            }
            
            function butLast(coll) {
                return _.toArray(coll).slice(0, -1);    
            }
            
            function interpose(inter, coll) {
                return butLast(mapcat(function(e) { 
                    return construct(e, [inter]); 
                }, coll));
            }
            
            var result = interpose(',', [1, 2, 3]);

            assert.equal(result[0], 1);
            assert.equal(result[1], ',');
            assert.equal(result[2], 2);
            assert.equal(result[3], ',');
            assert.equal(result[4], 3);
            
        }
    });        

    Suite.tests.push({
        name: "Collection-centric programming - 'It is better to have 100 functions operate on one data structure than 10 functions on 10 data structures.'",
        body: function() {
            
            var object1 = {a: 1, b: 2},
                result1 = _.map(object1, _.identity),
            
                // = > [[' a', 1], [' b', 2]]
                result2 = _.map(object1, function(v, k) {
                    return [k, v];
                }),
                
                // = > [[' a', 1, [' a', 'b']], [' b', 2, [' a', 'b']]]
                result3 = _.map(object1, function(v, k, obj) {
                    return [k, v, obj];
                });
            
            _.map(result1, function(n, index) { 
                
                    if (index === 0 ) {
                       assert.equal(n, 1);
                    } else if (index == 1) {
                        assert.equal(n, 2);
                    }     
            });
            
            assert.equal(result2[0][0], 'a');
            assert.equal(result2[0][1], 1);
            assert.equal(result2[1][0], 'b');
            assert.equal(result2[1][1], 2);
            
            assert.equal(result3[0][0], 'a');
            assert.equal(result3[0][1], 1);
            assert.equal(result3[0][2], object1);
            assert.equal(result3[1][0], 'b');
            assert.equal(result3[1][1], 2);
            assert.equal(result3[1][2], object1);
            
        }
    });    


    Suite.tests.push({
        name: "Deconstructing objects into arrays",
        body: function() {
            
            var zombie = { name: 'Bob' },
            
                //Deconstructing object into array
                
                // = > ["name"]
                keys = _.keys(zombie),
                
                // = > ["Bob"]
                values = _.values(zombie),
                
                // = > ["Bob", "Bub"]
                allNames = _.pluck([{name: 'Bob'}, {name: 'Bub'}], 'name'),
                
                // = > [[" name", "Bob"]]
                objectToArray = _.pairs(zombie);
                
            assert.isTrue(_.contains(keys, 'name'));
            assert.isTrue(_.contains(values, 'Bob'));
            assert.isFalse(_.contains(keys, 'Bob'));
            assert.isFalse(_.contains(values, 'name'));
            
            assert.equal(allNames.length, 2);
            assert.isTrue(_.contains(allNames, 'Bob'));
            assert.isTrue(_.contains(allNames, 'Bub'));
            
            assert.isArray(objectToArray);
            assert.equal(objectToArray.length, 1);
            assert.isArray(objectToArray[0]);
            assert.equal(objectToArray[0][0], 'name');
            assert.equal(objectToArray[0][1], 'Bob');
        
            
        }
    });    


    Suite.tests.push({
        name: "Process the arrays and turn themback into objects",
        body: function() {
            
            var zombie = {name: 'Bub', film: 'The day'},
            
                // = > {NAME: "Bub", FILM: "The day"};  
                upperCaseKeys = _.object(_.map(_.pairs(zombie), function(pair) {
                    return [pair[0].toUpperCase(), pair[1]];
                }));
              
            assert.notEqual(_.keys(zombie)[0], _.keys(upperCaseKeys)[0]);
            assert.notEqual(_.keys(zombie)[1], _.keys(upperCaseKeys)[1]);
        }
    });    

    Suite.tests.push({
        name: "Inverting keys and values",
        body: function() {
            
            var zombie = {name: 'Bub', film: 'The day'},
                numberValues = {'a': 138, 'b': 9},
                
                // = > ["Bub", "The day"]
                invertedKeys = _.keys(_.invert(zombie)),
                
            
                // = > ['9', '138']
                invertedNumberValues = _.keys(_.invert(numberValues));

                
                
                assert.equal(invertedKeys[0], "Bub");
                assert.equal(invertedKeys[1], "The day");
                
                //The numbers become strings because we can only have strings for keys
                //Observe that keys method orders the keys by their values
                assert.equal(invertedNumberValues[0], "9");
                assert.equal(invertedNumberValues[1], "138");
                
        }
    });    
    
    
    Suite.tests.push({
        name: "Deconstructing objects into arrays - example with pluck, omit and pick",
        body: function() {
            
            // = > [Gardner", "Unknown"]
            var plucked = _.pluck(_.map([{title: 'Grendel', author: 'Gardner'}, {title: 'After Dark'}], 
                                    function(obj) { return _.defaults(obj, {author: 'Unknown'})}), 'author'),
                person = {name: 'Romy', token: '123', password: 'pass'},
                
                // = > {name: "Romy"}
                info = _.omit(person, 'token', 'password'),
                
                // = > {password: "pass", token: "123"};
                cred = _.pick(person, 'token', 'password');
                
                
                
            assert.equal(plucked.length, 2);
            assert.equal(plucked[0], 'Gardner');
            assert.equal(plucked[1], 'Unknown');
            
            assert.isTrue(_.contains(_.keys(info), 'name'));
            assert.isFalse(_.contains(_.keys(info), 'token'));
            assert.isFalse(_.contains(_.keys(info), 'password'));
            
            assert.isFalse(_.contains(_.keys(cred), 'name'));
            assert.isTrue(_.contains(_.keys(cred), 'token'));
            assert.isTrue(_.contains(_.keys(cred), 'password'));
        }
    });    
    
    Suite.tests.push({
        name: "Finders",
        body: function() {
            
            var obj1 = {title: 'SICP', isbn: '12345', ed: 1},
                obj2 = {title: 'SICP', isbn: '11111', ed: 2},
                obj3 = {title: 'Joy of Closure', isbn: '22222', ed: 1},
                library = [ obj1, obj2, obj3],
                            
                // = > {title: "SICP", isbn: "11111", ed: 2}
                found1 = _.findWhere(library, {title: 'SICP', ed: 2}),
                
                
                // = > [{ title: "SICP", isbn: "12345", ed: 1},
                // {title: "SICP", isbn: "11111", ed: 2}]
                found2 = _.where(library, {title: 'SICP'});
                
                
                assert.equal(found1, obj2);
                assert.equal(found2.length, 2);
                assert.equal(found2[0], obj1);
                assert.equal(found2[1], obj2);
        }
    });    

    Suite.tests.push({
        name: "Thinking in data - collection of JavaScript objects as table - SELECT clause",
        body: function() {
            
            //Collection of JavaScript objects could be seen as table - each object is a row, keys are column names, values are cell values
            
            var obj1 = {title: 'SICP', isbn: '12345', ed: 1},
                obj2 = {title: 'SICP', isbn: '11111', ed: 2},
                obj3 = {title: 'Joy of Closure', isbn: '22222', ed: 1},
                library = [ obj1, obj2, obj3],
                
                // = > [" SICP", "SICP", "Joy of Clojure"]
                titles = _.pluck(library, 'title');

                // The problem with pluck is that it creates different abstraction - Array
                assert.isArray(titles);
                assert.equal(titles.length, 3);
                
                // = > [obj1, 'title', 'isbn'] 
                var testConstruct = construct(obj1, ['title', 'isbn']);
                
                assert.equal(testConstruct.length, 3);
                assert.isObject(testConstruct[0]);
                assert.equal(testConstruct[1], 'title');
                assert.equal(testConstruct[2], 'isbn');
                
                
                // Do some processign with keeping the structure
                // = > [{ isbn: "0262010771", title: "SICP"}, 
                //      {isbn: "0262510871", title: "SICP"}, 
                //      {isbn: "1935182641", title: "Joy of Clojure"}];
                var editionResults = project(library, ['title', 'isbn']);
                assert.isArray(editionResults);
                _.each(editionResults, function(obj) {
                    assert.isObject(obj); 
                });
                
                // Do some additional processing with keeping the structure
                // = > [{ isbn: "0262010771"},{ isbn: "0262510871"},{ isbn: "1935182641"}]
                var isbnResults = project(editionResults, ['isbn']); 
                assert.isArray(isbnResults);
                _.each(isbnResults, function(obj) {
                    assert.isObject(obj); 
                });
                
                // Change the structure to hand it over to another module
                var modifiedStructure = _.pluck(isbnResults, 'isbn');
                assert.isArray(modifiedStructure);
                _.each(modifiedStructure, function(obj) {
                    assert.isString(obj);
                });
                
                
                
        }
    });

    Suite.tests.push({
        name: "Thinking in data - collection of JavaScript objects as table - AS clause",
        body: function() {
            
            //Collection of JavaScript objects could be seen as table - each object is a row, keys are column names, values are cell values
            
            var obj1 = {title: 'SICP', isbn: '12345', ed: 1},
                obj2 = {title: 'SICP', isbn: '11111', ed: 2},
                obj3 = {title: 'Joy of Closure', isbn: '22222', ed: 1},
                library = [ obj1, obj2, obj3];
                
            // = > {b: 2, AAA: 1}
            var renamed = rename({a:1, b:2}, {'a': 'AAA'});
            assert.isDefined(renamed.AAA);
            assert.equal(renamed.AAA, 1);
            
            // = > [{ title: "SICP", isbn: "0262010771", edition: 1}, 
            //      {title: "SICP", isbn: "0262510871", edition: 2}, 
            //      {title: "Joy of Clojure", isbn: "1935182641", edition: 1}]
            var renamedLibrary = as(library, {ed: 'edition'});
            assert.isDefined(renamedLibrary[0].edition);
            assert.isDefined(renamedLibrary[1].edition);
            assert.isDefined(renamedLibrary[2].edition);
            
            // = > [{ edition: 1}, {edition: 2}, {edition: 1}];
            var projectedLibrary = project(as(library, {ed: 'edition'}), ['edition']);
            assert.isDefined(projectedLibrary[0].edition);
            assert.isDefined(projectedLibrary[1].edition);
            assert.isDefined(projectedLibrary[2].edition);
        }
    });

    Suite.tests.push({
        name: "Thinking in data - collection of JavaScript objects as table - WHERE clause",
        body: function() {
            
            //Collection of JavaScript objects could be seen as table - each object is a row, keys are column names, values are cell values
            
            var obj1 = {title: 'SICP', isbn: '12345', ed: 1},
                obj2 = {title: 'SICP', isbn: '11111', ed: 2},
                obj3 = {title: 'Joy of Closure', isbn: '22222', ed: 1},
                library = [ obj1, obj2, obj3];
                
            function restrict(table, pred) {
                return _.reduce(table, function(newTable, obj) {
                    if(truthy(pred(obj))) {
                        return newTable;
                    } else {
                        return _.without(newTable, obj);
                    }
                }, table);
            }
            
            // = > [{ title: "SICP", isbn: "0262510871", ed: 2}]
            var restricted1 = restrict(library, function(book) {
                return book.ed > 1;    
            });
            
            

            // = > [{ title: "SICP", isbn: "0262510871", edition: 2}]
            var restricted2 = restrict(
                project(
                    as(library, {ed: 'edition'}),
                    ['title', 'isbn', 'edition']
                ),
                function(book) {
                    return book.edition > 1;
                }
            );
            console.log(restricted1);
            console.log(restricted2);
            assert.equal(restricted1.length, 1);
            assert.equal(restricted2.length, 1);
            assert.isDefined(restricted1[0].ed);
            assert.isDefined(restricted2[0].edition);
        }
    });

return Suite;

});

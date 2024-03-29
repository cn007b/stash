ECMAScript 6
-

[all features](http://es6-features.org/)

````js
// Constants.
const PI = 3.141593
// If possible, use `const` everywhere for more robust code.
// Only use `let` if you know its value needs to change.
// `var` shouldn’t be used in ES6.
// `const` means that the identifier can’t be reassigned.
// IMPORTANT: Objects stored in constants are mutable!
const colors = {red: "#f00"};
colors.green = "#0f0";
console.log(colors); // { "red": "#00f", "green": "#0f0" }
// but
colors = {code: 200}; // Error

// Let - allows you to declare variables that are limited in scope to the block.
for (let i = 0; i < 3; i++) {}

// Block-Scoped Functions.
{
    function foo () { return 1 }
    foo() === 1 {
        function foo () { return console.log(2) }
        foo() === 2
    }
}

// Arrow Functions.
// More expressive closure syntax. Expression Bodies.
// @IMPORTANT:
// Arrow functions are LEXICALLY scoped,
// `this` in arrow function - context of running code!
// call, bind, apply useless with arrow functions!
// Arrow functions don't have prototype!
var hello = function (cb) {
    cb({code: 200, message: 'hello world'});
};
hello(v => console.log(v));

odds  = evens.map(v => v + 1)
pairs = evens.map(v => ({ even: v, odd: v + 1 }))
nums  = evens.map((v, i) => v + i)

// Default Parameter Values.
function f (x, y = 7, z = 42) {
    return x + y + z
}
f(1) === 50

// Variadic functions.
function f (x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, "hello", true, 7) === 9

// Spread Operator.
var params = [ "hello", true, 7 ]
var other = [ 1, 2, ...params ]

// String Interpolation.
var customer = { name: "Foo" }
message = `Hello ${customer.name} ${1 + 2}!`;

// Binary & Octal Literal.
0b111110111 === 503
0o767 === 503

// Unicode String & RegExp Literal
"𠮷".length === 2

// Computed Property Names
obj = {
    foo: "bar",
    [ "baz" + 1 ]: 42
}

// Array Matching
var list = [ 1, 2, 3 ]
var [ a, , b ] = list
a === 1; b === 3;

// Array.of(9000);
// Array.entries();

// Parameter Context Matching
function f ([ name, val ]) {
    console.log(name, val)
}
function g ({ name: n, val: v }) {
    console.log(n, v)
}
function h ({ name, val }) {
    console.log(name, val)
}
f([ "bar", 42 ])
g({ name: "foo", val:  7 })
h({ name: "bar", val: 42 })

// Fail-soft destructuring, optionally with defaults.
var list = [ 7, 42 ]
var [ a = 1, b = 2, c = 3, d ] = list
a === 7
b === 42
c === 3
d === undefined

// Value Export/Import
//  lib/math.js
export function sum (x, y) { return x + y }
export var pi = 3.141593
//  someApp.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))
//  otherApp.js
import { sum, pi } from "lib/math"
console.log("2π = " + sum(pi, pi))

// Set Data-Structure
let s = new Set()
s.add("hello").add("goodbye").add("hello")
s.has("hello") === true
s.values() // SetIterator {"hello", "goodbye"}

// Map Data-Structure
let m = new Map()
m.set("hello", 42)
m.get("hello") === 42
m.entries() // MapIterator {"hello" => 42}

// Object Property Assignment
var dst  = { quux: 0 }
var src1 = { foo: 1, bar: 2 }
var src2 = { foo: 3, baz: 4 }
Object.assign(dst, src1, src2)
dst.quux === 0
dst.foo  === 3
dst.bar  === 2
dst.baz  === 4

// Object.is(obj1, obj2)

// Array Element Finding
[ 1, 3, 4, 2 ].find(x => x > 3) // 4

// Number Truncation
console.log(Math.trunc(42.7)) // 42
console.log(Math.trunc( 0.1)) // 0
console.log(Math.trunc(-0.1)) // -0

// Reflection
let obj = { a: 1 }
Reflect.ownKeys(obj) // Reflect.ownKeys(obj)

// Currency Formatting
var l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
var l10nGBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
var l10nEUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
l10nUSD.format(100200300.40) === "$100,200,300.40"
l10nGBP.format(100200300.40) === "£100,200,300.40"
l10nEUR.format(100200300.40) === "100.200.300,40 €"
````

````js
// Class Definition
// If parent class has constructor - child class must call `super()`!
// `new.target`- access to child clas from parent class.
class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}

// Class Inheritance
class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }
}

// Base Class Access
class Shape {
    toString () {
        return `Shape(${this.id})`
    }
}
class Rectangle extends Shape {
    toString () {
        return "Rectangle > " + super.toString()
    }
}

// Static Members
class Rectangle {
    static defaultRectangle () {
        return 'defaultRectangle';
    }
}
Rectangle.defaultRectangle();

// Getter/Setter
class Rectangle {
    constructor (width, height) {
        this._width  = width
        this._height = height
    }
    set width  (width)  { this._width = width               }
    get width  ()       { return this._width                }
    set height (height) { this._height = height             }
    get height ()       { return this._height               }
    get area   ()       { return this._width * this._height }
}
var r = new Rectangle(50, 20);
r.area === 1000
````


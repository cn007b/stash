Rust
-
<br>rustc 1.40.0
Since 2006.

[docs](https://www.rust-lang.org/learn)
[playground](https://play.rust-lang.org/)

````sh
rustc --version

CARGO_HOME

cargo new hw --bin
````
Rust - multi-paradigm, general-purpose lang designed for performance, safety, concurrency.
Without garbage collector and with strong, static, safe typing.

cargo - Rust's package manager.

Data ytpes:

Scalar Types:
* integer (i8, i16, i32, i64, i128, isize, u8, u16, u32, u64, u128, usize)
* float (f32, f64)
* bool
* char
Compound Types:
* tuple (tup)
* array

````rust
while x < 10 {}
loop { if true {break;} }
for i in 1..11 {}
for (k,v) in (30..40).enumerate() {}
````

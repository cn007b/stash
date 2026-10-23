package main

import (
	"fmt"
)

type MyErr struct {
}

func (m MyErr) Error() string {
	return "MyError"
}

func main() {
	err1 := f1()
	fmt.Printf("[err1] %+v \n", err1 == nil) // printss: [err1] false

	err2 := f2()
	fmt.Printf("[err2] %+v \n", err2 == nil) // printss: [err2] false
}

func f1() error {
	var e *MyErr
	return e
}

func f2() error {
	e := &MyErr{}
	return e
}

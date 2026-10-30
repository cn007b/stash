package main

import (
	"fmt"
)

func main() {
	// simple()
	simpleDefault()
	// fallthroughFunc1()
	// fallthroughFunc2()
}

func simple() {
	i := 4
	switch i {
	case 1:
		fmt.Println("one")
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	case 4, 5:
		fmt.Println("4 of 5")
	default:
		fmt.Println("oops...")
	}
	/*
		4 of 5
	*/
}

func simpleDefault() {
	i := 1
	switch i {
	case 1:
		// no code here.
	default:
		fmt.Println("default")
	}
	/*
	*/
}

func fallthroughFunc1() {
	v := 42
	switch v {
	case 100:
		fmt.Println(100)
		fallthrough
	case 42:
		fmt.Println(42)
		fallthrough
	case 1:
		fmt.Println(1)
	default:
		fmt.Println("default")
	}
	/*
		42
		1
	*/
}

func fallthroughFunc2() {
	v := 42
	switch v {
	case 100:
		fmt.Println(100)
		fallthrough
	case 42:
		fmt.Println(42)
		fallthrough
	case 1:
		fmt.Println(1)
		fallthrough
	default:
		fmt.Println("default")
	}
	/*
		42
		1
		default
	*/
}

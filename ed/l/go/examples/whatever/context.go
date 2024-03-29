package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	// withTimeout()
	// withCancel()
	// three()
	withValue()
}

func three() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-signals
		cancel()
	}()

	for {
		select {
		case <-ctx.Done():
			fmt.Println("ctx done, error:", ctx.Err())
			return
		default:
			time.Sleep(900 * time.Microsecond)
			fmt.Print(".")
		}
	}
}

func withCancel() {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
	ctx2, _ := context.WithCancel(ctx) // derived context
	defer cancel()

	for {
		select {
		case <-time.After(1 * time.Second):
			fmt.Println("overslept")
		case <-ctx.Done():
			fmt.Println("ctx done, error:", ctx.Err())
			return
		case <-ctx2.Done():
			fmt.Println("ctx2 done, error:", ctx2.Err())
			return
		default:
			fmt.Print(".")
		}
	}
}

func withTimeout() {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
	defer cancel()

	for {
		select {
		case <-time.After(1 * time.Second):
			fmt.Println("overslept")
		case <-ctx.Done():
			fmt.Println("ctx done, error:", ctx.Err())
			return
		default:
			fmt.Print(".")
		}
	}
}


func withValue() {
	type ContextKey string
	const MyContextKey ContextKey = "X-Key"

	// set value
	ctx := context.WithValue(context.Background(), MyContextKey, "foo")

	// get value
	v := ctx.Value(MyContextKey).(string)
	fmt.Println("[withValue] value:", v)
}

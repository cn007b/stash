package go_app

import (
	"encoding/json"
	"fmt"
	"github.com/mjibson/goon"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"net/http"
)

type User struct {
	Id   string `datastore:"-" goon:"id"`
	Name string
	Tag  string
	I    int
	B    bool
	F    float32
	AB   []byte
}

type Author struct {
	Name string
}

type Book struct {
	Author
	Id    string `datastore:"-" goon:"id"`
	Title string
	Kind  string `datastore:"-" goon:"kind"`
}

func goonHandler(w http.ResponseWriter, r *http.Request) {
	put1(w, r)
	put2(w, r)
	put3(w, r)
	put4(w, r)
	put5(w, r)
	get1(w, r)
	get3(w, r)
	get4(w, r)
	select1(w, r)
	select2(w, r)
	select3(w, r)
}

func put1(w http.ResponseWriter, r *http.Request) {
	u := &User{Id: "usr1", Name: "Test User1", Tag: "test", I: 7, B: true, F: 3.2, AB: []byte("it works")}
	key, err := goon.NewGoon(r).Put(u)
	if err != nil {
		fmt.Fprintf(w, "<br>Error: %+v", err)
	}

	fmt.Fprintf(w, "<br>PUT 1 - OK, key: %+v", key)
}

func put2(w http.ResponseWriter, r *http.Request) {
	u := &User{Id: "usr2", Name: "Test User2", Tag: "test"}
	key, _ := goon.NewGoon(r).Put(u)

	fmt.Fprintf(w, "<br>PUT 2 - OK, key: %+v", key)
}

func put3(w http.ResponseWriter, r *http.Request) {
	u := &User{Id: "usr3", Name: "Real User, with id 3", Tag: "ukraine"}
	key, _ := goon.NewGoon(r).Put(u)

	fmt.Fprintf(w, "<br>PUT 3 - OK, key: %+v", key)
}

func put4(w http.ResponseWriter, r *http.Request) {
	b := Book{Author: Author{Name: "Sheva"}, Id: "Kobzar", Title: "Kobzar", Kind: "BooksCollection"}
	key, err := goon.NewGoon(r).Put(&b)
	j, _ := json.Marshal(b)

	fmt.Fprintf(w, "<br>PUT 4 - OK, key: %+v, JSON: %s, error: %s", key, j, err)
}

func put5(w http.ResponseWriter, r *http.Request) {
}

func get1(w http.ResponseWriter, r *http.Request) {
	u := &User{Id: "usr1"}
	goon.NewGoon(r).Get(u)

	fmt.Fprintf(w, "<br>Get User 1: %+v", u)
}

func get3(w http.ResponseWriter, r *http.Request) {
	u := &User{Id: "usr3"}
	err := goon.NewGoon(r).Get(u)

	fmt.Fprintf(w, "<br>Get User 3: %+v, Error: %+v", u, err)
}

func get4(w http.ResponseWriter, r *http.Request) {
	b := Book{Id: "Kobzar", Kind: "BooksCollection"}
	err := goon.NewGoon(r).Get(&b)

	fmt.Fprintf(w, "<br>Get 4, book 1: %+v, Error: %+v", b, err)
}

func select1(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	q := datastore.
		NewQuery("User").
		Filter("Tag =", "test").
		Order("-Name") // order DESC
	u := make([]User, 0)
	_, err := q.GetAll(ctx, &u)
	if err != nil {
		fmt.Fprintf(w, "<br>Error: %+v", err)
	}
	fmt.Fprintf(w, "<hr>SELECT 1 - OK: %+v", u)
}

func select2(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	q := datastore.
		NewQuery("User").
		Filter("Name >", "Test").
		Order("-Name") // order DESC
	u := make([]User, 0)
	_, err := q.GetAll(ctx, &u)
	if err != nil {
		fmt.Fprintf(w, "<br>Error: %+v", err)
	}
	fmt.Fprintf(w, "<hr>SELECT 2 - OK: %+v", u)
}

func select3(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	q := datastore.
		NewQuery("User").
		Filter("Name >", "Test")
	count, err := q.Count(ctx)
	if err != nil {
		fmt.Fprintf(w, "<br>Error: %+v", err)
	}
	fmt.Fprintf(w, "<hr>SELECT 2 - OK, count: %d", count)
}

package controller

import (
	"encoding/json"
	"net/http"

	"app/http/protocol"
	"app/service/car"
	"app/service/car/request"
)

type Cars struct {
}

func (c Cars) registerRoutes() {
    http.HandleFunc("/cars", c.handleRequest)
}

func (c Cars) handleRequest(w http.ResponseWriter, r *http.Request) {
	// Default HTTP message (Error 501).
	var message protocol.HttpMessage

	// Deliver canonical HTTP message to client.
	defer func() {
		protocol.HttpResponse(w, message)
	}()

	// Regardless panic, restore state and reply to client with valid canonical message.
	defer func() {
		if err := recover(); err != nil {
			message = protocol.HttpException(err)
		}
	}()

	switch r.Method {
		case "GET":
		case "POST":
			dec := json.NewDecoder(r.Body)
			var query request.New
			err := dec.Decode(&query)
			if err == nil {
				message = protocol.HttpSuccess(200, car.CreateNewCar(query))
			} else {
				message = protocol.HttpError(500, "Internal Server Error. " + err.Error())
			}
		case "PUT":
			message = protocol.HttpError(501, "Not Implemented.")
		case "DELETE":
			message = protocol.HttpError(405, "Method Not Allowed.")
		default:
			message = protocol.HttpError(404, "Not Found.")
	}
}

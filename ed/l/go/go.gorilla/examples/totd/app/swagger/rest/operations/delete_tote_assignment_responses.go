// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/to-com/poc-td/app/swagger/restmodel"
)

// DeleteToteAssignmentOKCode is the HTTP code returned for type DeleteToteAssignmentOK
const DeleteToteAssignmentOKCode int = 200

/*DeleteToteAssignmentOK Successful response.

swagger:response deleteToteAssignmentOK
*/
type DeleteToteAssignmentOK struct {

	/*
	  In: Body
	*/
	Payload *restmodel.DeleteToteAssignmentResponse `json:"body,omitempty"`
}

// NewDeleteToteAssignmentOK creates DeleteToteAssignmentOK with default headers values
func NewDeleteToteAssignmentOK() *DeleteToteAssignmentOK {

	return &DeleteToteAssignmentOK{}
}

// WithPayload adds the payload to the delete tote assignment o k response
func (o *DeleteToteAssignmentOK) WithPayload(payload *restmodel.DeleteToteAssignmentResponse) *DeleteToteAssignmentOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete tote assignment o k response
func (o *DeleteToteAssignmentOK) SetPayload(payload *restmodel.DeleteToteAssignmentResponse) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteToteAssignmentOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// DeleteToteAssignmentBadRequestCode is the HTTP code returned for type DeleteToteAssignmentBadRequest
const DeleteToteAssignmentBadRequestCode int = 400

/*DeleteToteAssignmentBadRequest Bad Request.

swagger:response deleteToteAssignmentBadRequest
*/
type DeleteToteAssignmentBadRequest struct {

	/*
	  In: Body
	*/
	Payload *restmodel.Response400 `json:"body,omitempty"`
}

// NewDeleteToteAssignmentBadRequest creates DeleteToteAssignmentBadRequest with default headers values
func NewDeleteToteAssignmentBadRequest() *DeleteToteAssignmentBadRequest {

	return &DeleteToteAssignmentBadRequest{}
}

// WithPayload adds the payload to the delete tote assignment bad request response
func (o *DeleteToteAssignmentBadRequest) WithPayload(payload *restmodel.Response400) *DeleteToteAssignmentBadRequest {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete tote assignment bad request response
func (o *DeleteToteAssignmentBadRequest) SetPayload(payload *restmodel.Response400) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteToteAssignmentBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(400)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

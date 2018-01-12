Protocol Buffers (protobuf)
-

Canonically, messages are serialized into a binary wire format.

Scalar Value Types:

* double
* float
* int32, int64
* uint32, uint64 - Uses variable-length encoding (integer in php).
* sint32, sint64 - (integer in php).
* fixed32, fixed64 - (integer in php).
* sfixed32, sfixed64 - (integer in php).
* bool
* string
* bytes - any arbitrary sequence of bytes (string in php).

Protocol Buffers are not designed to handle large messages.
If you are dealing in messages larger than a megabyte each, it may be time to consider an alternate strategy.
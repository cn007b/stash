Messaging patterns
-

Messaging pattern - is a network-oriented architectural pattern
which describes how two different parts of a Message-Passing-System
communicate with each other.

#### Message Exchange Patterns:

* In-Only (one-way) - send message receive status

* Robust In-Only (reliable one-way)
  - send message receive status, if status `false` - return status.

* In-Out (request–response or standard two-way)
  - send message receive message

* In-Optional-Out - response is optional.

* Out-Only (reverse In-Only) - supports event notification.

* Robust Out-Only - like out-only but it can trigger a fault message.

* Out-In (reverse In-Out) - consumer initiates the exchange.

* Out-Optional-In (reverse In-Optional-Out)
  - incoming message is optional (Optional-in).

#### In ØMQ:

* Request–reply - RPC

* Publish–subscribe (data distribution pattern)
  - connects a set of publishers to a set of subscribers.

* Push–pull (`fan-out`/`fan-in`)
  - parallel task distribution and don't wait for any response.

* Exclusive pair - connects two sockets in an exclusive pair.
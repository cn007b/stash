RabbitMQ
-

[sourcecode](https://github.com/rabbitinaction/sourcecode)

RabbitMQ uses AMQP (Advanced Message Queuing Protocol).

## Queue

Declaring a queue is idempotent - it will only be created if it doesn't exist already.
Keep in mind that messages are sent asynchronously from the server to the clients.

Queue can be:
* `durable` - queue won't be lost even if RabbitMQ restarts (persisting queue to disk).
* `exclusive` - delete queue when not needed (when all connections to queue closed).
* `auto delete` - delete queue when consumer unsubscribes.

Marking messages as persistent doesn't fully guarantee that a message won't be lost.
It tells RabbitMQ to save the message to disk.

Avoid black hole messages:
* Have its delivery mode option set to 2 (persistent).
* Be published into a durable exchange.
* Arrive in a durable queue.

Messages from queue can be `dead-lettered` if:
* Message is rejected.
* TTL expired.
* Queue length limit exceeded.

Dead letter exchanges (DLXs) are normal exchanges.
They can be any of the usual types and are declared as usual.

## Exchange

Exchange - receives messages from producers and pushes them to queues.
There are a few exchange types available:
* direct.
* fanout.
* topic.
* headers.

Direct (workers; rpc; routing key `info`, `warning` etc) exchange
delivers messages to queues based on the message routing key.

Fanout ignores the routing key (ideal for the broadcast).
If N queues are bound to a fanout exchange, when a new message is published to that exchange
a copy of the message is delivered to all N queues.

Topic (producer `anonymous.info`; recipient `*.critical`, `#`, `kernel.*` ...) exchanges
route messages to one or many queues
based on matching between a message routing key
and the pattern that was used to bind a queue to an exchange.
Keep in mind that, usually, bindings on topic exchanges use more memory than in direct or fanout exchanges.

Headers exchanges ignore the routing key attribute.
Instead, the attributes used for routing are taken from the headers attribute.

That relationship between exchange and a queue is called a binding.

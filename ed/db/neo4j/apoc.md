APOC
-

[funcs](https://neo4j.com/labs/apoc/4.1/overview/)
[import transaction size](https://neo4j.com/labs/apoc/4.1/graph-updates/periodic-execution/)
[atomic updates](https://neo4j.com/labs/apoc/4.1/graph-updates/atomic-updates/)
[ttl](https://neo4j.com/labs/apoc/4.1/graph-updates/ttl/)
[conversion functions](https://neo4j.com/labs/apoc/4.1/data-structures/conversion-functions/)
[conditionals](https://neo4j.com/labs/apoc/4.1/cypher-execution/conditionals/)
[parallel execution](https://neo4j.com/labs/apoc/4.1/cypher-execution/parallel/)
[virtual nodes](https://neo4j.com/labs/apoc/4.1/virtual/virtual-nodes-rels/)
[grouping](https://neo4j.com/labs/apoc/4.1/virtual/graph-grouping/)
[triggers](https://neo4j.com/labs/apoc/4.1/background-operations/triggers/)
[after db initialization](https://neo4j.com/labs/apoc/4.1/operational/init-script/)
[warmup](https://neo4j.com/labs/apoc/4.1/operational/warmup/)
[string funcs](https://neo4j.com/labs/apoc/4.1/misc/text-functions/)
[schema info](https://neo4j.com/labs/apoc/4.1/indexes/schema-index-operations/)

````js
// monitoring
CALL apoc.monitor.kernel();
CALL apoc.monitor.store();
CALL apoc.monitor.tx();



// get IDs by regex
RETURN apoc.text.regexGroups(
'[{"id":"c6f68cdf-7deb-48c3-9b85-1a0ff545cd3a","name":"a"},{"id":"48d7f2cd-d596-4c94-b2b2-71bd0dee7576","name":"b"}]',
'(?<="id":")\w{8}-\w{4}-\w{4}-\w{4}-\w{12}'
) AS ids;

CALL apoc.static.set('x.user', 'Mike');
RETURN apoc.static.get('x.user') AS value;

RETURN apoc.create.uuid() AS uuid;

apoc.node.id(node);
apoc.node.labels(node);
apoc.node.relationship.types(node);
apoc.rel.id(relationship);
apoc.rel.type(relationship);

apoc.diff.nodes(node1, node2);

// run query in separate transactions (limit is batch size per transaction).
CALL apoc.periodic.commit(
  "MATCH (u:User) WITH u LIMIT $limit SET u.x = $x RETURN count(u)",
  {x: $x, limit: 1000}
);

// run 2nd statement for each item returned by 1st statement,
// it gets all items for statement 1 (not batch).
apoc.periodic.iterate('return items', 'handle item', {batchSize: 10})
CALL apoc.periodic.iterate(
  'MATCH (o:Organization) RETURN o',
  'DETACH DELETE o',
  {batchSize: 2}
)

// cypher
CALL apoc.cypher.run("MATCH (n:Person {code:'007'}) RETURN n;", null) YIELD value
RETURN value;
//
CALL apoc.cypher.run('with $x as x return x', {x: 'x'}) YIELD value
RETURN value;

// search
CALL apoc.search.nodeAll('{Person: ["name", "code"], Organization: "name"}', 'contains', '00')
YIELD node AS n RETURN n;

// when
:param x => 1;
:param y => 2;
CALL apoc.when(
  $x > $y,
  'RETURN value1',
  'RETURN value2',
  {value1:$x, value2:$y}
) YIELD value;
// Result: {"value2":2}

// do.when
CALL apoc.do.when(
  $x > $y,
  'RETURN value1',
  'RETURN value2',
  {value1:$x, value2:$y}
) YIELD value;

apoc.create.setProperty(node, property, value);
````

Redirect relationships:

````js
CREATE (p:Person {name:'x'})-[r:FOOBAR {a:1}]->(f:Foo)
CREATE (b:Bar)
RETURN *;

// replace target node
MATCH (p:Person {name:'x'})-[r:FOOBAR {a:1}]->(f:Foo) with id(r) as id
MATCH (b:Bar) with b
MATCH ()-[r]->(), (b:Bar) CALL apoc.refactor.to(r, b) YIELD input, output RETURN *;

// check
MATCH (n) RETURN n;

// clear
MATCH (n) DETACH DELETE n;
````

Atomic:

````js
// option 1
CREATE (c:Counter {name: 'basic', value: 0});
MATCH (c:Counter {name: 'basic'}) SET c._lock = true, c.value = c.value + 1 RETURN c;

// option 2
MATCH (c:Counter {name: 'basic'})
CALL apoc.atomic.add(c,'value', 1, 5)
YIELD oldValue, newValue
RETURN c;
````

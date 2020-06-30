// Cypher



WITH 204 as c RETURN c;
// var
:param code => 200
WITH $code as c RETURN c;
RETURN $code;
// to see all vars
:params



// NODES
CREATE (p:Person {name: 'James Bond', code: '007', active: true}) RETURN p;
CREATE (p:Person {name: 'Moneypenny', code: 'mp', active: true}) RETURN p;
CREATE (p:Person {name: 'Felix Leiter', code: 'felix'});
CREATE (p:Person {name: '008', code: '008'}) RETURN p;
CREATE (p:Person {name: 'Q', code: 'q'});
CREATE (p:Person {name: 'M', code: 'm'});
CREATE (p:Person {name: 'Vesper Lynd', code: 'vesper'});

CREATE (o:Organization {name:'MI6'});
CREATE (o:Organization {name:'CIA'});
CREATE (o:Organization {name:'test'});

CREATE (c:Country {name:'UK'});
CREATE (c:Country {name:'USA'});



// RELATIONSHIPS
// works at
MATCH (p:Person), (o:Organization) WHERE p.code = '007'   AND o.name = 'MI6' CREATE (p)-[r:WORKS_AT]->(o);
MATCH (p:Person), (o:Organization) WHERE p.code = '008'   AND o.name = 'MI6' CREATE (p)-[r:WORKS_AT]->(o);
MATCH (p:Person), (o:Organization) WHERE p.code = 'mp'    AND o.name = 'MI6' CREATE (p)-[r:WORKS_AT]->(o);
MATCH (p:Person), (o:Organization) WHERE p.code = 'q'     AND o.name = 'MI6' CREATE (p)-[r:WORKS_AT]->(o);
MATCH (p:Person), (o:Organization) WHERE p.code = 'm'     AND o.name = 'MI6' CREATE (p)-[r:WORKS_AT]->(o);
MATCH (p:Person), (o:Organization) WHERE p.code = 'felix' AND o.name = 'CIA' CREATE (p)-[r:WORKS_AT]->(o);
// bond familiar with
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'mp'     CREATE (a)-[r:FAMILIAR]->(b) RETURN type(r);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'mp'     CREATE (a)-[r:FRIENDS{close: true}]->(b) RETURN type(r);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'felix'  CREATE (a)-[r:FAMILIAR]->(b);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = '008'    CREATE (a)-[r:FAMILIAR]->(b);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'q'      CREATE (a)-[r:FAMILIAR]->(b);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'm'      CREATE (a)-[r:FAMILIAR]->(b);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'vesper' CREATE (a)-[r:FAMILIAR]->(b);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'vesper' CREATE (a)-[r:FRIENDS{close: true}]->(b);
MATCH (a:Person), (b:Person) WHERE a.code = '007' AND b.code = 'vesper' CREATE (a)-[r:FRIENDS{very_close: true}]->(b);
//
MATCH (a:Person), (b:Person) WHERE a.code = 'felix' AND b.code = 'vesper' CREATE (a)-[r:FAMILIAR]->(b);
// country of organization
MATCH (o:Organization {name: 'MI6'}),(c:Country {name:'UK'}) CREATE (o)-[r:COUNTRY]->(c) RETURN o, c;
MATCH (o:Organization {name: 'CIA'}),(c:Country {name:'USA'}) CREATE (o)-[r:COUNTRY]->(c) RETURN o, c;
// visited
MATCH (p:Person {code: '007'}),(c:Country {name:'USA'}) CREATE (p)-[r:visited]->(c) RETURN p, c;



// get all
MATCH (p:Person) RETURN p;
MATCH (o:Organization) RETURN o;
OPTIONAL MATCH (c:Country) OPTIONAL MATCH (o:Organization) OPTIONAL MATCH (p:Person) RETURN c, o, p;

// get
MATCH (n:Person {code:'007'}) RETURN n, id(n);
MATCH (n:Person {code:'007'}) RETURN n {.name, .status}; // projections
MATCH (p:Person) WHERE p.code = '007'  RETURN p;
MATCH (p:Person) WHERE p.code STARTS WITH '00' RETURN p;
MATCH (p:Person) WHERE p.code ENDS WITH '7' RETURN p;
MATCH (p:Person) WHERE p.code CONTAINS '7' RETURN p;
MATCH (p:Person) WHERE NOT p.code STARTS WITH '00'  RETURN p;
MATCH (n:Organization {name:'test'}) RETURN n;
MATCH (n:Person) WHERE n.active = true RETURN n;
MATCH (n1:Person {code:'007'}), (n2:Person {code:'008'}) RETURN n1, n2;

// get 2
MATCH (p:Person {code:'007'})
MATCH (o:Organization {name:'MI6'})
RETURN p, o;

// update
MATCH (n:Organization {name:'test'}) SET n.name = 'TEST_ORG' RETURN n.name;
MATCH (n:Organization {name:'TEST_ORG'}) RETURN n;

// delete
MATCH (n:Person {name:'James Bond'}) DELETE n;
MATCH (n:Organization {name:'test'}) DELETE n;
MATCH (n:Organization {name:'TEST_ORG'}) DELETE n;
// delete relationship
MATCH (p:Person {code: 'felix'})-[r:WORKS_AT]->(o:Organization) DELETE r;

// select all
MATCH (n) RETURN n SKIP 0 LIMIT 100;
MATCH (n:Organization) RETURN n;

// case
MATCH (p:Person {name: 'James Bond'})
RETURN
  p.name,
  CASE p.active
  WHEN true THEN 'yes'
  WHEN false THEN 'no'
  ELSE 3 END
  AS s
;



// node's relationships
MATCH (:Person {code: '007'})-[r]-() RETURN r;
MATCH (:Organization {name: 'MI6'})-[r]-() RETURN r;
MATCH (p:Person {code: '007'})--(n) RETURN p, n; // related to any

// bond familiar with
MATCH (b:Person {code: '007'})-[:FAMILIAR]->(p) RETURN b, p;
MATCH (b:Person {code: '007'})-[:FAMILIAR|FRIENDS]->(p) RETURN b, p;
MATCH (b:Person {code: '007'})-[:FRIENDS{close: true}]->(p) RETURN b, p;
MATCH (b:Person {code: '007'})-[:FAMILIAR]->(n) RETURN b, n.name ORDER BY n.name;

// bond works at
MATCH (b:Person {code: '007'})-[:WORKS_AT]->(n) RETURN b, n.name ORDER BY n.name;

// country of MI6
MATCH (:Organization {name: 'MI6'})-[:COUNTRY]->(c) RETURN c;

// country for persons
MATCH (p:Person)-[:WORKS_AT]->(o)-[:COUNTRY]->(c) RETURN p, o, c;
MATCH (p:Person)-[]->()-[]->(c:Country) RETURN p, c;

// active person or from CIA
MATCH (c1:Country)<-[:COUNTRY]-(o1:Organization)<-[:WORKS_AT]-(p1:Person {active: true})
MATCH (c2:Country)<-[:COUNTRY]-(o2:Organization {name: 'CIA'})<-[:WORKS_AT]-(p2:Person)
RETURN c1, o1, p1, c2, o2, p2;

// a path of length 2
MATCH (a:Person)-[*2]->(b:Country) RETURN a, b;
MATCH (a:Person)-[*3..5]->(b:Country) RETURN a, b;

// shortest path
MATCH (a:Person {code: 'vesper'}), (b:Person {code: 'm'}), p = shortestPath((a)-[*]-(b))
RETURN a, b, p;



// with
MATCH (p:Person {code:'007'})--(relatedTo)-->()
WITH relatedTo
RETURN relatedTo.name;

// with 2
MATCH (bond:Person {code:'007'})
WITH bond
MATCH (bond)-[:WORKS_AT]->(o:Organization)-[:COUNTRY]->(c:Country {name:'UK'})
RETURN bond, o, c;

// match-match without with
MATCH (p:Person)
WHERE p.code STARTS WITH '00'
MATCH (p)-[:WORKS_AT]->(o:Organization)-[:COUNTRY]->(c:Country {name:'UK'})
RETURN p, o, c;



// from MI6 and knows Felix
MATCH (p1:Person)-[:WORKS_AT]->(o:Organization {name: 'MI6'})
MATCH (p1)-[:FAMILIAR]->(p2:Person {code: 'felix'})
RETURN p1, o, p2;
// optional match
MATCH (p1:Person)-[:WORKS_AT]->(o:Organization {name: 'MI6'})
OPTIONAL MATCH (p1)-[:FAMILIAR]->(p2:Person {code: 'felix'})
RETURN p1, o, p2;

// optional match relationship
MATCH (p1:Person)
OPTIONAL MATCH (p1:Person)-->(p2:Person {code: 'felix'})
RETURN p1, p2;



// unwind
UNWIND [1, 1, 1, 2, 3, NULL] AS x RETURN x;
UNWIND [1, 1, 1, 2, 3, NULL] AS x WITH DISTINCT x RETURN x;
UNWIND [1, 1, 1, 2, 3, NULL] AS x WITH DISTINCT x RETURN COLLECT(x);


// AGGREGATION
MATCH (n:Person) RETURN COUNT(n) as count;
MATCH (n:Person) RETURN DISTINCT LABELS(n), COUNT(*);
MATCH (n:Person) RETURN DISTINCT n.code;

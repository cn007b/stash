Apache Lucene
-

[docs](https://lucene.apache.org/core/8_9_0/index.html)

````sh
* # wildcard
? # single character wildcard

content:"James Bond" # phrase search

content:/James [A-Za-z]*/ # regex

\/etc\/pwd # escape special chars

id:>400

_exists_:user.name # exists field, colon ":" here to separate field name
NOT _exists_:user.name # exists field

labels: (* AND -foo) # labels string not contains foo
````

Operators: AND, "+", OR, NOT, "-" (‼️ operators must be all in UPPER CASE).
````sh
msg -Error # not Error
msg !Error # not Error
````

Range search:
````sh
[1 TO 5] # inclusive range
{1 TO 5} # exclusive range: 2, 3, 4
[1 TO *}
````

Approximate search:
````sh
"system register"~2 # 2 words between system & register
# result:
# "SYSTEM failed to REGISTER"
# "SYSTEM could not REGISTER"
# "SYSTEM can REGISTER"
````

Fuzzy search:
````sh
1info~2
````

Boosting:
````sh
windows^3 linux^30
````

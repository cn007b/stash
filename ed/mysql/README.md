MySql
-

*5.1.72-rel14.10*

#### Snippets

````sql
-- Create new user like root
-- mysql --user=root mysql
CREATE USER 'test2'@'localhost' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON *.* TO 'test2'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON testDb.* TO 'client'@'%' IDENTIFIED BY 'pwd' WITH GRANT OPTION

-- grant user
GRANT ALL PRIVILEGES ON testDB.* TO 'test2'@'localhost' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON testDB.* TO 'test2'@'%' IDENTIFIED BY 'pass';

-- set password for user
SET PASSWORD FOR 'ziipr'@'localhost' = PASSWORD('12345');
DROP USER 'jeffrey'@'localhost';
````

````sql
CREATE TABLE tmpTbl (
    id int UNSIGNED NOT NULL AUTO_INCREMENT KEY
    , tid TINYINT UNSIGNED NOT NULL DEFAULT 0
    , userId INT UNSIGNED NOT NULL DEFAULT 0
    , message TEXT, -- NOT NULL DEFAULT ''
    , createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    , name VARCHAR(25) NOT NULL DEFAULT '' UNIQUE
);

CREATE TABLE IF NOT EXISTS tbl LIKE talbeLike;
INSERT INTO table SELECT * FROM talbeLike;

ALTER  TABLE table    ADD field INTEGER(1) NOT NULL AFTER anotherFieldName;
ALTER  TABLE table    ADD UNIQUE KEY (field);
ALTER  TABLE engineer ADD UNIQUE KEY username_email (username, email);
ALTER  TABLE engineer ADD FOREIGN KEY (LanguageID) REFERENCES languages(LanguageId) ON DELETE RESTRICT;
CREATE INDEX indexName ON table (column);

ALTER  TABLE table MODIFY field VARCHAR(7) NOT NULL DEFAULT '';
ALTER  TABLE table CHANGE field field VARCHAR(7) NOT NULL DEFAULT ''; -- rename column
ALTER  TABLE table CHANGE field field TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER  TABLE table DROP COLUMN field;
ALTER  TABLE table DROP FOREIGN KEY key; -- CONSTRAINT.
ALTER  TABLE table DROP KEY key;

DROP   TABLE IF EXISTS tableNewName;
DROP   INDEX indexName ON table;

RENAME TABLE table TO tableNewName;
````

````sql
SHOW ENGINE INNODB STATUS\G -- show lot of helpful info including last error

SHOW OPEN TABLES from  dataBaseName; -- Show locked tables.

SHOW TABLE STATUS WHERE name = 'table'; -- Info about table, with creation date.
SELECT
    table_name, create_time
FROM information_schema.tables
WHERE table_schema='dataBaseName' AND create_time BETWEEN '2014-05-05' AND '2014-05-07'
;
SHOW COLUMNS FROM table LIKE '%'; -- columns in table format like DESC tableName
-- get AUTO_INCREMENT
SELECT AUTO_INCREMENT FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'databaseName' AND TABLE_NAME = 'table';

SELECT SQL_CALC_FOUND_ROWS * FROM table;
SELECT FOUND_ROWS();

SELECT SUM(field) FROM table GROUP BY field WITH ROLLUP;
INSERT LOW_PRIORITY INTO table1 SELECT field FROM table2;

SELECT * FROM stockTable ORDER BY field(stockid, 33, 12, 53); -- ordered result: 33, 12, 53
````

#### Functions

````sql
CONV(2, 10, 2) -- CONV(num , from_base, to_base)
LPAD('ZipCode', 10, '0') -- 000ZipCode

ROW_COUNT()                        -- after insert, update, delete
LAST_INSERT_ID()
CONNECTION_ID()

UNIX_TIMESTAMP()
CURTIME()
sysdate()                          -- now
LAST_DAY(date)                     -- last day in month
CURRENT_DATE                       -- today

REPLACE('vvv.site.com', 'v', 'w')  -- www.site.com

SELECT SUBSTRING_INDEX('www.mysql.com', '.', 1); -- www
SELECT SUBSTRING_INDEX('www.mysql.com', '.', 2); -- www.mysql 
SELECT SUBSTRING_INDEX('www.mysql.com', '.', -1); -- com
SELECT SUBSTRING_INDEX('www.mysql.com', '.', -2); -- mysql.com 
SELECT SUBSTRING_INDEX('yoyo3450@hotmail.com', '@', -1); -- hotmail.com
SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(jsonField, '"name":"', -1), '"', 1) name from users; -- name field from JSON field
SELECT ELT(1, 'foo', 'bar');       -- foo
SELECT FIELD('foo', 'foo', 'bar'); -- 1
SELECT FIND_IN_SET('b', 'a,b,cd'); -- 2
SELECT LEAST(15,10,25);            -- 10

INET_ATON(ip)
INET_NTOA(i)

UUID()
````

#### Flashback

````sql
INSERT INTO brand2 (name) SELECT name FROM brand;

LIMIT OFFSET, COUNT

-- First works AND than OR

LIKE '[JM]%'                          -- begins on J or M
% - *
_ - 1 char
[] - group of symblols

COLLATE UTF8_GENERAL_CI LIKE

SELECT COALESCE(field, 0) FROM table; -- if field is null returns 0

OREDER BY ASC                         -- default ASC

INSERT INTO table VALUES (default);   -- default value

UPDATE tab SET field = DEFAULT(field);

CHECK TABLE tab; -- checks a table for errors, for MyISAM - update key statistics 
ANALYZE TABLE tab; -- performs a key distribution analysis
REPAIR TABLE tab; -- repairs a possibly corrupted table (MyISAM, ARCHIVE, and CSV)
OPTIMIZE TABLE tab; -- reorganizes the physical storage of table data and associated index data,
                    -- to reduce storage space and improve I/O efficiency when accessing the table.

SELECT VERSION();
SELECT USER();
SELECT * FROM mysql.user; -- Select all mysql users.
SHOW GRANTS FOR 'usr';
SHOW GRANTS;
SHOW PRIVILEGES;

SHOW FULL TABLES;

Horizontal scaling means that you scale by adding more machines into your pool of resources (Replication).
Vertical scaling means that you scale by adding more power (CPU, RAM) to your existing machine.
````

#### Tricks

````
~/.mysql_history

tee /tmp/out
cat /tmp/out | mail mail@com.com

user@ubuntu:~$ mysql --pager='less -S'

mysql> pager less -SFX
mysql> \s
````

#### Set

````sql
SET @id = 1;
SELECT @id;
+------+
| @id  |
+------+
|    1 |
+------+

SELECT @myRight := rgt FROM nested_category WHERE name = 'TELEVISIONS';
SELECT @myRight;
+----------+
| @myRight |
+----------+
|        9 |
+----------+
````

#### NULL

Aggregate (summary) functions such as COUNT(), MIN(), and SUM() ignore NULL values.
The exception to this is COUNT(*), which counts rows

#### Optimizations

````sql
force index (createdAt)

-- SELECT DISTINCT faster than SELECT GROUB BY.
SELECT DISTINCT id FROM table;
-- vs
SELECT id FROM table GROUP BY id;
````

#### Options

````sql
SET SQL_BIG_SELECTS  = 1;
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;

SELECT SQL_CACHE
SELECT SQL_NO_CACHE
````

#### Sizes


Every table (regardless of storage engine) has a maximum row size of 65,535 bytes.

Maximum Names Length:


| Identifier                                                                                                 | Maximum Length (characters) |
|------------------------------------------------------------------------------------------------------------|-----------------------------|
| Database, Table                                                                                            | 64 (NDB engine: 63)         |
| Column, Index, Constraint, Stored Program, View, Tablespace, Server, Log File Group, User-Defined Variable | 64                          |
| Alias                                                                                                      | 256                         |

````sql
-- tables sizes
SELECT
    table_name AS 'Table',
    round(((data_length + index_length) / 1024 / 1024), 2) 'Size in MB'
FROM information_schema.TABLES
WHERE table_schema = 'dbName' AND table_name = 'tableName'
;

-- data usage
SET @tbl1 = 'user';
SELECT
    TABLE_NAME, TABLE_ROWS, AVG_ROW_LENGTH, DATA_LENGTH, INDEX_LENGTH, DATA_FREE
FROM information_schema.TABLES
WHERE table_schema = 'test' AND table_name IN (@tbl1)
;

-- Count of rows in db.
SELECT TABLE_NAME, TABLE_ROWS FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbName';
````

#### mySqlDump

````
mysqldump -h hostname -u user -pPassWord --skip-triggers --single-transaction --complete-insert --extended-insert --quote-names --disable-keys dataBaseName | gzip -с > DUMP_dataBaseName.sql.gz
# dump only db schema
mysqldump -h hostname -u user -pPassWord --no-data --single-transaction --complete-insert --extended-insert --quote-names dbname table > dump.sql.gz
-- mysqldump -hHost Base table | gzip | uuencode table.gz | mail mail@com.com -s table
-- mysqldump -h Host Base table --where="id=11" | mail mail@com.com
mysql -hHost -uUser -pPass -DBase < dumpFile.sql
````
````
-- mysql -h Host -D Base -e "select * from table where id in (1,2);" | gzip | pv | uuencode result.csv.gz | mail
````

#### Slow query log

````
mkdir /var/log/mysql
touch /var/log/mysql/logSlowQueries.log
chown mysql.mysql -R /var/log/mysql

mysql -e "
SET GLOBAL slow_query_log_file = '/var/log/mysql/logSlowQueries.log';
SET GLOBAL slow_query_log = 1;
SET GLOBAL long_query_time = 1;
SET GLOBAL log_queries_not_using_indexes = 0;
"
````

Conf:
/etc/mysql/my.cnf
````sql
slow_query_log = 1
slow_query_log_file = /var/log/mysql/logSlowQueries.log
long_query_time = 1
log_queries_not_using_indexes = 0
innodb_log_file_size = 5M

general-log = 1
general-log-file = /var/log/mysql/general.log
# And run:
# sudo mkdir -p /var/log/mysql
# sudo touch /var/log/mysql/general.log
# sudo chown mysql:mysql /var/log/mysql/general.log

SET global general_log_file='/var/log/mysql/general.log';
SET global general_log = 1;
````

#### Storage engines

* InnoDB
    * Support for **transactions** (giving you support for the ACID property).
    * **Foreign key** constraints (take more time in designing).
    * **Row level locking**. Faster in **write-intensive** because it utilizes row-level locking and only hold up changes to the same row that’s being inserted or updated.
    * **Recovers from a crash** or other unexpected shutdown by replaying its logs.
    * Consumes more system resources such as RAM.
* MyISAM
    * **Table level locking**. Slower than InnoDB for tables that are frequently being inserted to or updated, because the entire table is locked for any insert or update.
    * Faster than InnoDB on the whole as a result of the simpler structure thus much less costs of server resources.
    * Especially good for **read-intensive** (select) tables.
    * (The maximum number of indexes per MyISAM table is 64. The maximum number of columns per index is 16).
    * (Uses one file for data rows and another for index records).
* MEMORY
* CSV
* ARCHIVE
* BLACKHOLE
* MERGE
* FEDERATED
* EXAMPLE

#### [Data Types](http://dev.mysql.com/doc/refman/5.0/en/data-types.html)

* Numeric Types:
    * [Integer](http://dev.mysql.com/doc/refman/5.0/en/integer-types.html):
        * Tinyint (Bytes 1).
        * Smallint (Bytes 2).
        * Mediumint (Bytes 3).
        * Int (Bytes 4).
        * Bigint (Bytes 8).
    * Fixed-Point:
        * Decimal.
        * Numeric.
    * Floating-Point:
        * Float (A precision from 0 to 23 results in a 4-byte single-precision FLOAT column.),
        * Double (A precision from 24 to 53 results in an 8-byte double-precision DOUBLE column.),
    * Bit-Value:
        * Bit.
* Date and Time Types:
    * Date (The supported range is '1000-01-01' to '9999-12-31'.).
    * Datetime (The supported range is '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.).
    * Timestamp (Has a range of '1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC.).
    * Time (Range from '-838:59:59' to '838:59:59'.).
    * Year (Range of 1901 to 2155, or 0000.).
    * YEAR(2) (Range of 1901 to 2155, and 0000) (Display only the last two digits, omit the century digits).
    * YEAR(4) (Range of 1901 to 2155, and 0000).
* String Types:
    * Char.
    * Varchar.
    * Binary.
    * Varbinary.
    * Blob:
        * Tinyblob (2^8-1 bytes).
        * Blob (2^16-1 bytes).
        * Mediumblob (2^24-1 bytes).
        * Longblob (2^32-1 bytes).
    * Text:
        * Tinytext (255 bytes).
        * Text (65535 bytes).
        * Mediumtext (16 777 215 bytes).
        * Longtext (4 294 967 295 bytes).
    * Enum (You cannot employ a user variable as an enumeration value, an enumeration value can also be the empty string ('') or NULL).
    * Set (Is a string object that can have zero or more values, can have a maximum of 64 distinct members, cannot contain comma).
* Spatial Data Types:
    * Geometry.
    * Point.
    * Linestring.
    * Polygon.
    * Multipoint.
    * Multilinestring.
    * Multipolygon.
    * Geometrycollection.
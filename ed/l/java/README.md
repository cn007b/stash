Java
-
Since 1995.

[jdk](http://jdk.java.net/)

Java - high-level OOP language and runtime environment,
with static, strong, safe typing.

````sh
/usr/libexec/java_home --verbose
ls /Library/Java/JavaVirtualMachines/

# point JAVA_HOME to certain JAVA version
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
export JAVA_HOME=/Library/Java/JavaVirtualMachines/amazon-corretto-11.jdk/Contents/Home

java -version

java $f
javac $f # compile

HEAP_SIZE
JVM_ARGS="-XX:+UseG1GC"
MIN_MEM_SIZE="512"
MAX_MEM_SIZE="1024"
java $JVM_ARGS -Xms${MIN_MEM_SIZE}m -Xmx${MAX_MEM_SIZE}m -Djava.security.egd=file:/dev/./urandom -jar /tmp/x.jar

````

````java
System.out.println("dbg");

/** This is JavaDoc comment... */

int x;
x = 5;
final x int = 3;

for (float v: arr) sum += v;

class Foo extends Bar {}
class Foo implements Comparable<Bar> {}
@Override
super.parentMethod();

Objects.isNull(v);

// generics
Class<?> aClass = Some.class; // any class
List<? extends Person> persons // anything which extends Person
List<T extends Person> persons
````

POM  - Project Object Model.
JSE  - Java Standard Edition
JEE  - Java Enterprise Edition (Wildfly, WebSphere, WebLogic, Tomcat).
EJA  - Enterprise Java Application.
JVM  - Java Virtual Machine (in JRE).
JRE  - Java Runtime Environmen (in JDK).
JDK  - Java Development Kit.
POJO - Plain Old Java Object.
JDBC - Java DB Connectivity.
JAR  - Java ARchive.

IDE -> JDK -> App -> JRE (-> JVM) -> Host Env.

Java supports method overloading.

#### Data types

Primitive Data Types:
* Integer (byte, short, int, long)
* Floating point (float, double)
* Boolean
* Character

Non-Primitive Data Types:
* String
* Array
* Class
* Interface

Special types:
* Null

#### Collections

* List (ArrayList, LinkedList)
* Set
* Map

#### Concurrency

* ThreadPoolExecutor, new Thread
* Executors.newWorkStealingPool, ForkJoinPool, ForkJoinTask, BlockingQueue
* ExecutorCompletionService
* CountDownLatch, CompletableFuture, Semaphore, CyclicBarrier
* keywords: volatile, synchronized

#### Asynchronous Programming

Executors.newSingleThreadExecutor, new Signal, CompletableFuture.supplyAsync

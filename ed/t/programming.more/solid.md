SOLID
-

* Single responsibility principle.
* Open/closed principle.
* Liskov substitution principle.
* Interface segregation principle.
* Dependency inversion principle.

SRP - states that every class should have responsibility over a single part
of the functionality provided by the software.
If description contains word AND or OR - it's not SRP.

OCP - (classes, modules, functions, etc.)
should be open for extension, but closed for modification.
Problems: Code base may contain leftover classes.

LSP - if S is a subtype of T,
then objects of type T may be replaced with objects of type S
without altering any of the desirable properties of the program.

ISP - splits interfaces which are very large into smaller and more specific ones.

DIP - refers to a specific form of decoupling software modules.

* High-level modules should not depend on low-level modules. Both should depend on abstractions.
* Abstractions should not depend on details. Details should depend on abstractions.
* Abstraction dependency:
  * All member variables in a class must be interfaces or abstracts.
  * All concrete class packages must connect only through interface/abstract classes packages.
  * No class should derive from a concrete class.
  * No method should override an implemented method.
  * All variable instantiation requires the implementation of a Creational pattern
    as the Factory Method or the Factory pattern,
    or the more complex use of a Dependency Injection framework.

# Extra

Package cohesion:
REP - Release Reuse Equivalency Principle, the granule of reuse is the granule of release.
CCP - Common-Closure Principle, classes that change together are packaged together.
CRP - Common Reuse Principle, classes that are used together are packaged together.

Couplings between packages:
ADP - Acyclic Dependencies Principle, the dependency graph of packages must have no cycles.
SDP - Stable Dependencies Principle, depend in the direction of stability.
SAP - Stable Abstractions Principle, abstractness increases with stability.

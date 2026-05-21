# Entity Component System

The design is based on my understanding of an entity component system, which is likely a misunderstanding. So some things might be weird.

# Entities

Entities as always are just ids, in this case integers. The entity `1` is reserved for a "global" entity, to keep state that isn't specific to any one game entity.

# Components

A component is a data object, indexed to an entity.

A component can be added or removed to an entity, by adding a new entry in the component map for that entity, or removing the existing entry for that map.

These removals are queued and performed in between update loops.

The components are mutable, and shared, any system can mutate any component they can read.

## State machines

In a traditional game, moving between related sets of behaviours may be modelled as a Finite State Machine (FSM) with some kind of tagged union.

In this engine, moving between behaviours should be implemented by adding or removing a component, shifting control of the entity from one system to another.

This should be sequential, with one system handing off control to another not hierarchical with one system managing the others.

# System

A system implements a behaviour.

A system operates over a set of components and the entities which have *all* of those components.

An index is maintained for each system, so that they can iterate over these entities.

During an update loop, the `update()` function is called for each system in some unspecified order.

## Interactions

When entities engage in a behaviour together, that behaviour should be represented in a single system even if that behaviour is assymetrical.

e.g. if bullets collide with enemies, both the bullets and the enemies should share a component.
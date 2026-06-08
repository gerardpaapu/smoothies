- [ ] It seems like a lot of systems want to know if you've arrived at your goal, so maybe we should track that on goal
- [ ] I guess there should be some way to delete an entity from every component? or maybe there shouldn't be?
- [ ] Rename index to query?
- [ ] Export the queries as a function from the system
- [ ] The components can have a "dirty" flag to avoid rework
- [ ] The queries can also use that flag
- [x] Split components that used tagged unions into two components and the system can just do two queries
- [ ] Report your $$$ every now and then
- [x] Making drinks should involve collecting ingredients and then mixing the drink
- [ ] Ingredients should run out
- [x] Add boba pearls
- [ ] Some guy should show up and deliver more ingredients (for $$$)
- [ ] Customers should choose something from a menu
- [ ] Customers leave the queue if they get bored
- [x] Customers should pay for their drink
- [x] Customers should say whether they liked the drink or not
- [x] Customers shouldn't be in the "making an order" system, servers should move from "making an order" to "order pickup" (where the customer will be waiting)
- [x] Customers should have preferences
- [x] Flavours break down into their components
- [ ] Day/night timer (closed at night, empty the queue)
- [x] Add blueprints for some composites (e.g. customer)
- [ ] The spawn rate should climb throughout the day, peaking at lunch and then tailing off quickly, with smaller peaks and breakfast (8am?) and brunch (10am?)
- [ ] It feels like the walk to goal system is mostly working really well, but it's awkward to say if they've reached the goal, or if we should then remove their goal (because they've reached it).
- [ ] We need to extract some helper functions for standing relative to something, but ... does that require each object to have a bounding box? I guess that might be an okay thing for them to have
- [ ] Add a focus, maybe if you click on a focusable object they monopolise focus, and we can show a details panel about them
- [ ] Rename utils to like model or data or something, it's about stateless functions more or less and type definitions
- [ ] organise the model directory by topic/types
- [ ] what's our convention for component names and system names? I feel like components that have noun names are inconvenient, but maybe they also shouldn't have "process" names like systems. Instead of Position => HasPosition, Queue => IsInQueue? Leaving => IsLeaving? SpriteName => HasSpriteName?
- [ ] Rendering is it's own thing, like system and component, let's move it out
- [ ] Let's start thinking about "screens", maybe it's modal, so you switch to another fullscreen view that is just about managing the menu, or reading twitter, it would be nice to add a bit of interaction now.
- [ ] We need a way to describe an NPCs tastes, either a diagram or english sentences. I think english is more fun if we can pull it off
- [ ] I think generating new customers should be data driven, maybe we can start from archetypes and add mutation, or add standalone features
- [ ] Employees should take breaks
- [ ] Employees should make a mess
- [ ] Employees should do dishes
- [ ] Employees should pick up rubbish
- [ ] There should be a rubbish bine
- [ ] We should add branding
- [ ] There should be a shift super who 
- [ ] Maybe it's cleaner to have one person taking orders and everyone else talks to them and gets a cup with a sticker on it

## Framework rewrite

Rewrite to fat structs? Right now we're using columnar storage, and it's kind of awkward, but also I kind of like this awkwardness.

Instead we could create each entity with just a slot for every component, they could be sparse, we can have a single array with all of the entity objects, and the queries could just return them.

Regardless of that.

1. We should give each component a timestamp for when it was last updated (as a tick number?), which would allow us to cache each query.

2. Let's rename build-index to query

3. I'm a bit ambivalent about how the queries are currently working, on the one hand, they're just a function that you call and it gives you all the relevant ids, how much simpler can you get? On the other hand it feels like they should be "managed" somehow by the framework, like the update function should just be passed the result of the query.


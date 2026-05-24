# Special Locations

I need to add location to the simulation before I can add visuals.

Which means that a lot of the ideas that didn't have location now must

Right now, I'll probably hardcode these somewhere but in the future 
it should be data-driven.

Locations in the game are basically in screenspace, except that we're allowed fractional values (which will be rounded before rendering) and negative values or offscreen values (which are not visible).

## Entrance

This will be a location in the lower left of the map, new folks will
spawn here before joining the queue

## Queue point

This is where the queue starts, whom ever is in the 1st position in the queue should stand here to make their order.

There should be location opposite the head of the queue where servers will stand to take orders

## Pickup

This needs to be just right of the center, it's effectively another queue, but instead of tidily waiting here customers should wander a little.

Their serve can call them or go directly to them to deliver their drink.

## Exit

Far to screen right this is where customers walk to after they have their drinks.

## Prep stations

Gathering an ingredient should involve walking to the prep station that has that ingredient, waiting until it is unused and then monopolising it until you have gathered the ingredient.

In the same vein servers will need to go to the mixer and monopolise it to mix their drink.

## Ingredients dropoff

The delivery guy will come in through a service entrance (top left?) and walk towards the kitchen (center) to deliver ingredients.

A server should meet him and pay him, then unpack the ingredients into the prep stations.
# Movement

To avoid having each system include the complexity of moving characters around, we'll keep all that in a system that moves
entities with a location and a goal towards their goals.

Collision isn't very important for this game, so I think characters
can sort of just drift towards their goal through any other character

We can "randomly" have them idle instead of walk and when there's a range of directions they could walk in to reach their goal they
can choose one of them at random
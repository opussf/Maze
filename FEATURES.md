# SpaceMaze!

## Overview
Mazes are designed to be confusing.
To be a challange to explore, or escape.
Good mazes send the explorer down dead ends, make you double back on yourself and have lots of choices.
Bad mazes are little more than a walk through a twisty, turning corridor.
Some mazes have door ways, trap doors, one way traps, maybe even hazards of some sort.
Most mazes explore a 2D space.

How could one explore a 3D maze?
Not one with ladders, or methods to change 'levels' at stratigic points, but a maze that is actually 3D.
A maze where one might have an intersection with 6 exits.

## Movement

What I envision is a maze where the 3rd axis of movement is free to move in, and one fully controls their orientation in the maze space.
Being able to move freely, translation or rotation, will provide a level of confusion.
Changing the mechanics of movement will also add to the confusion.
I.E. is the explorer 'free floating', and can move over a missing wall.
Or is the explorer always 'walking' on a wall, where an open space beneath them causes a pitch down, and walking into a wall causes a pitch up.

┌──────────────┐            ┌─────────┐
│              │            │         │
└──────────────┘            └─────┬───┤
                               ▲  │   │
   ▲────┐                   ◀──┼──┤D  │
   │    │                      │  │   │
┌─────┐ ▼   ┌──┐            ┌─────┤   │
│  A B│──▶  │ E│            │  C  │   │
└─────┘     └──┘            └─────┴───┘

Explorer standing on A, walking to the right, would end up standing on B, looking down.
Explorer standing on C, walking to the right, would end up standing on D, looking up.

The 'free floating' idea would let the explorer 'standing' on A, float over the gap, and end up standing on E, looking to the right.
Likewise, the 'free floating' idea would prohibit the explorer from moving forward from C.
Movement could be explained with having hand rails in a zero-g (micro-g?) environment within easy reach of the explorer.

The 'walking' idea could be explained as if the explorer is also in a zero-g environment with adhesive boots to walk on surfaces.

Other options of movement could include momentum based, where the explorer can only push off of walls (maybe straight up), and stop by landing on a wall.
In the momentum system, stopping at the intersection on the left above, or really any intersection, could be very tricky, if not impossible.

## Controls

If movement in such a free, and open system is not already confusing enough, the explorer will need to have the ability to freely rotate and translate.
Rotation should let the explorer 'pitch', 'roll', and 'yaw'.
Translation should let the explorer move in any of the X, Y, or Z axis.
Only a matter of scale (how big are the open spaces), should inhibit the ability to move in a direction, or have a specific movement vector.




## Some Technical babble
Since most mazes are 2D, the floor is a given, the ceiling un-important, and only the 4 walls need to be known.
If one were to create a maze using a coordinate system in 2D, then each coordinate could represent a 'room'.
A 'room' has the ability to have either exits, or walls.
For this document, I'm choosing to express the existance or not of a wall.
Since this is a binary value, a 2D 'room' can be expressed in 4 bits (NESW).

An on bit indicates that a wall is present, and that one can not move in that direction.
An off bit indicates that a wall is not present, and that one can move in that direction.
Since each room describes the 6 walls, or ability to travel in that direction, the ability to have one way walls is encoded into this.
A one way wall is one where the explorer can leave a room in a direction to enter another room, but the new room has a wall that prohibits the explorer from retreating.

This allows the maze to be encoded into 4 bits (a nibble) per room.
2 nibbles make a byte, or a normal 8 bit character can store 2 rooms.
A single 32 bit integer can encode 8 rooms.
Creating mazes that have a 'width' of a multiple of 8 rooms allows for very tight encoding.

Some 2D maze systems, or level systems, use a character map for each 'room'.
Where a 0 value represents a non-restrictive area, and the items in the 'room', are encoded as a character.
A wall would be shown as a 'room' with a wall value, I.E. a 'W'.
A wall with a bit of art might be shown as a 'room' with an 'A'.
A 'room' with a light in it, but passable, might be shown with an 'L'.

### Expanding to 3D
In 3D, much of the above can be used, with the addition of the Z (or Y) axis.
Adding in 2 more bits to the encoding for the 'ceiling' and 'floor' (CNEFSW).
Note the off by 3 places pairing, this may or may not help the math later (hell if I know at this stage).

While 6 bits is all that is needed to represent the walls, or exits of a room, this is not a binary power of 2.
This means that compact encoding gets messy and may be hard to use realtime.
Expanding this out to 8 bits, and using the 2 extra bits a room flags would keep things 'square', and allow some extra info for each room.
Possible flags for the extra bits might include, lighting, for dynamic illumination.
Of if this room is a source of something.
If a room can only have one extra property then this can encode 4 distinct states.
This could also encode if it is the start, or end, or a check point (score gain?) for finding an item?
More data may be needed.

## Starting and Solving
Mazes tend to have a start and an end, an entrance and an exit, or an entry point and a goal.
There could be a maze where one enters at one point, needs to find an item, and then either return to the start point, or make it to a goal.

Some could have puzzles.
Switches that open doors, swap rooms, etc.

### 3D specific puzzles

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

The normal 'AWSD' system, paired with the arrow keys and a jump button, may be good enough, with only a few additions.
'W' and 'S' would be a translation forward (in the facing direction), or backwards.
'Q' and 'E' tend to be 'strafing', or moving side to side.
'space' and 'z' would be a translation of up and down.

'A' and 'D' would be a rotation of yaw, left or right.
'up' and 'down' would be rotation of pitch.
'left' and 'right' would be a roll.

Depending on the movement scheme, stopping would be automatic.
The 'walking' scheme would let the explorer move as they press the buttons.
A jump might detatch the explorer from the 'floor', to let them reorient and 'land' on the 'ceiling'.

The 'momentum' scheme might not let the explorer 'translate' except by pushing off of a nearby wall.
The explorer could move left if there is a wall on their right, or move backwards if a wall is in front of them, etc.

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

### Into a polar system.

While I started this idea as a what-if about a 3D cube type of system, this could also create a polar type of system, with a y-offset.
This could simulate a tube, such as a space ship, or current space station, like the ISS, or even something more complex and exotic.
Navigating something like a spinning wheel type of space station, or even a spinning tube could then be simulated.
The effects of rotation, and angular momemtum would then enter into the movement challenges.

## Starting and Solving
Mazes tend to have a start and an end, an entrance and an exit, or an entry point and a goal.
There could be a maze where one enters at one point, needs to find an item, and then either return to the start point, or make it to a goal.

Some could have puzzles.
Switches that open doors, swap rooms, etc.

### 3D specific puzzles
Puzzles will expand this to include challenges of navigation.
Having a pull in a specific direction because of artificial gravity, or because of rotation, will change how the explorer has to perceve(sp?) the maze.


## Keeping it simple to start.

The initial plan is to keep it super simple.
Make this an exploration into Unity, or another technology to render and move through a maze.

* Design and realize a 3D maze
	- Maybe start with a 2x2x2, or even a 3x3x3 sized maze.
	- Create a simple 10x10x10 'room' maze, with a starting point, and an ending point.
	- Encode the maze
* Write a system in Unity to render this maze
	- Simple walls and perspective
* Expand to allow the explorer to move through the maze
	- Collision detection
	- Simple free movement
	- Change of orientation based on perspective
* Start and goal
	- Start is a 'room'
	- Goal is out side of the 'cube'

* Design and realize a 3D maze creation system.

## Memory requirements


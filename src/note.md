# for spawning enemy sheep...

there are two options here.

# option 1:  
generate literally every possible solution for the computer.
then, once i've done that, pick a random one.

PROS:  
* load time will always be consistent
* will always have a solution ready
* this would be very useful for knowing the
* also allows for, if a gameboard is particularly complex and there aren't many solutions,
you can repick.  
* would also be useful for, if user is placing sheep, and they place sheep
in spots where a solution is no longer possible.
"hey, you picked a spot in which there's no solution."
or, highlight optional spots with green.
ideally, shouldn't have to do this. . .


CONS:
* total solutions to evaluate:   (boardsize * boardsize)^pieceAmount
* ex: board size is 7, pieces amount is 5
49 * 49 * 49 * 49 * 49
= 282475249
that's a lot...

# option 2:  
pick possible positions at random, until it works.

PROS:
* can get lucky and not hang
* when there's more possible solutions than impossible ones, probability is high enough that 
solution will be picked and not hang.

CONS:
* computer could theoretically keep picking wrong solutions an indeterminate amount of times
* load times inconsistent


/////////////////
Ideally, the maximum amount of space that sheeps take up should be such that
it is LESS THAN the total board space... but that makes for a far less fun and interesting game.  The reason that I'm encountering this
problem at all is because I hadn't been accounting for this.

7x7 - 49.
8x8 - 64.
9x9 - 81.
10x10 - 100.

The reason games like sea battle don't encounter this issue is because they
start you off with a random solution, and then let the player move ships around
to their liking.
So, other games DO account for all possible solutions.  

8x8:  64
3 2x1   /  max space per: 12   / total max space: 36
3 3x1   /  max space per: 15   / total max space: 45
1 4x1   /  max space per: 18   / total max space: 18
total total max space:  99
total board space:  64

if i want the player to place their pieces and not be able to move them after,
i need to ensure that the total total max space is LESS THAN the total board space.
that way, there will always be a solution available for the player.

7x7:  49

1 1x1     / max space per: 9
1 2x1     / max space per: 12
1 Tshape  / max space per: 18
1 smallL  / max space per: 15
1 4x1     / max space per: 18

total total max space:  72
total board space:  49

but that would make for a lame game if there's only 2-3 pieces on the board - players
would spend the majority of the time just picking empty spaces.  where's the fun
in that?

i think the solution is the following:
- figure out every possible solution for the game setup.
- store solutions in an array like data structure ie:  ([0, 0], [4, 0])
- based on all available solutions, pick a random one for the enemy computer
and set up their sheep.

- based on all available solutions, pick a random one for the player and
set up their sheep.

- refactor player setup code - allow them to select a sheep and move it.
- if player tries to move a sheep to an invalid space, move it back and display the error message.

- BONUS:  have a rotate sheep button.
- have a "start game" button.



///////////////////////////////////








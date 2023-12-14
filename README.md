### BATTLESHEEP
# Project by Nick C.

## Final Proposal

## Background
Battlesheep is a spin on the game Battleship.  It takes place on a farm // grass type environment.  Two farmers take turns trying to fire a cannon at each others' sheep.  

## Functionality and MVPs


## Wireframes

See the attached Wireframe.png in this repository for an outline.

## Technologies, Libraries, APIs

This project will be implemented with the following technologies:
* Canvas API to render the game board
* Webpack to bundle and transpile the source JavaScript code
* NPM to manage project dependencies

## Implementation Timeline

* Friday Afternoon & Weekend:
Setup project.
Get webpack up and running.
Get canvas to show up.
Get comfortable with Canvas API.
Design game assets.  Sheep,
background picture, cannon,
farmer, etc.
Get game assets to show up on screen.
Get the scaling, positioning, and rotation of objects right.  
Be able to manipulate these objects through player input if necessary (rotation, particularly, for rotating sheep blocks during place sheeps phase).
Outline, in code, the different game phases (from player 1's perspective, as that's what's in scope):
* main menu phase
* options phase 
* place sheep phase
* player 1 turn (player 2's squares, masked by fog of war)
* player 2 turn (attacks player 1's squares, player can see their own ships.)
* you win! / lose! end phase

* Monday
Finalize the game logic.
Implement the Computer AI.
Make it so that the computer, on every turn, hits a random position on the board.

* Tuesday
Add sounds.
Add music.
Code ability to turn music on and off.
Code ability to turn sound effects on and off.

* Wednesday
Finish implementing controls.
Test for bugs // edge cases.
Ensure things are rendering correctly.
Ensure gameplay works as expected.

* Thursday
Deploy to github pages.
If time, write a production README.

BONUS:
When making a new game, make the following fields customizable
* Board size(always a square.  6x6, 8x8, 10x10)
* Amount of Ships (1x1, 2x1, 3x1, 4x1, 2x2)
* Difficulty of Computer (Easy, Medium, Hard)
    * EASY: computer fires randomly every time.
    * MEDIUM: computer on a hit searches for the hit ship.
    * HARD: computer operates on a diagonal AND searches for hit ship on hit.




// unused code - for getting each possible permutation 
// of sheep placements.  

function getAllPossibleSolutions(){
    let l = this.computerLeftToPlace.length;

    let empty = []
    let mySheep = this.generateActiveSheep(this.computerLeftToPlace[0]);
    let positions = this.generatePossiblePositionArray(mySheep, empty);
    let that = this;
    let currentSolutions = []
    let currentIndex = 0
    positions.forEach(function(position) {
        let invalidPositions = []
        let solution = []
        let sheepPlacePositions = mySheep.getPlacePositionsOnly(position);
        sheepPlacePositions.forEach(function(pos){
            invalidPositions.push(pos);
        })
        solution.push(position);
        let arr = that.getSolutions(solution, invalidPositions, currentIndex + 1);
        currentSolutions.push(arr);
    })
    return currentSolutions;
}

function getSolutions(solution, myInvalidPositions, index) {
    let that = this;
    let mySheep = this.generateActiveSheep(this.computerLeftToPlace[index]);
    let positions = this.generatePossiblePositionArray(mySheep, myInvalidPositions);
    let solutions = [];
    positions.forEach(function(position) {
        let invalidPositions = JSON.parse(JSON.stringify(myInvalidPositions));
        let mySolution = JSON.parse(JSON.stringify(solution));
        let sheepPlacePositions = mySheep.getPlacePositionsOnly(position);
        sheepPlacePositions.forEach(function(pos){
            invalidPositions.push(pos);
        })
        mySolution.push(position);
        let currentIndex = index + 1;
        if (currentIndex === that.computerLeftToPlace.length) {
            solutions.push(mySolution);
        } else {
            let arr = that.getSolutions(mySolution, invalidPositions, currentIndex);
            solutions.push(arr);
        }
    })
    return solutions;
}
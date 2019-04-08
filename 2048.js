const base = require("./base");
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

// Constants
const NORTH = "NORTH"
const SOUTH = "SOUTH"
const EAST  = "EAST"
const WEST  = "WEST"

// Initial states
const initialState = () => ({
    cols:    3,
    rows:    3,
    moves:   [],
    matrix:  pipe(initMatrix, populate, populate)(3)
})

// Randomness
const populate = matrix => {
    const x = rnd(0)(matrix[0].length)
    const y = rnd(0)(matrix[0].length)
    if(matrix[x][y]){
        populate(matrix)
    }
    return addRnd2(matrix)(x)(y)
}

// Next values based on state
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves
const nextMatrix = state => state


const enqueue = (state, move) => merge(state)({ moves: state.moves.concat([move]) });

const next = spec({
    cols:   prop('cols'),
    rows:   prop('cols'),
    moves:  nextMoves,
    matrix: nextMatrix
})

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next }
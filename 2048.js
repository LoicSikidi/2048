const base = require("./base")
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

// Constants
const NORTH       = "NORTH"
const SOUTH       = "SOUTH"
const EAST        = "EAST"
const WEST        = "WEST"
const GOAL        = 2048
const MATRIX_SIZE = 4

// Initial states
const initialState = () => ({
    cols:    MATRIX_SIZE,
    rows:    MATRIX_SIZE,
    moves:   [],
    matrix:  pipe(initMatrix, populate, populate)(MATRIX_SIZE),
    isWin:   false,
    isLose:  false
})

// Randomness
const pickRandomElem = xs => xs[rnd(0)(xs.length)]
const populate   = matrix => {
    const emptyRows = pipe(m2emptyPos, flat, removeEmpty)(matrix)
    return emptyRows.length ? pipe(pickRandomElem, addRnd2(matrix))(emptyRows) : matrix
}

// Conditions
const isVerticalMove = move => move === NORTH || move === SOUTH 
const isValidMove    = state => move => JSON.stringify(state.matrix) !== JSON.stringify(nextMove(state.matrix)(move))
const isLose         = state => flat(state.matrix).every(e => e > 0)

// Next values based on state
const nextMoves      = state => state.moves
const nextMatrix     = state => pipe(nextMove(state.matrix), populate)(getLastMove(state))
const nextIsWin      = state => pipe(nextMove(state.matrix), flat)(getLastMove(state)).some(e => e >= GOAL)
const nextIsLose     = state => pipe(nextMove(state.matrix), flat)(getLastMove(state)).every(e => e > 0)

// Move mecanism
const getLastMove    = state => getLast(state.moves) 
const nextMove       = matrix => direction => isVerticalMove(direction) 
  ? verticalMove(matrix)(direction)
  : horizontalMove(matrix)(direction)
const verticalMove   = matrix => direction => [...matrix.keys()]
  .map(k => (direction === NORTH) ? move(col(matrix)(k)): pipe(reverse, move, reverse)(col(matrix)(k)))
  .map((val, k, matrix) => col(matrix)(k))
const horizontalMove = matrix => direction => [...matrix.keys()]
  .map(k => (direction === WEST) ? move(row(matrix)(k)) : pipe(reverse, move, reverse)(row(matrix)(k)))

const next = spec({
    cols:   prop('cols'),
    rows:   prop('rows'),
    moves:  nextMoves,
    matrix: nextMatrix,
    isWin:  nextIsWin,
    isLose: nextIsLose
})

const enqueue = (state, move) => isValidMove(state)(move)
  ? next(merge(state)({ moves: state.moves.concat([move]) }))
  : state

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue }
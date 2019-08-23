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
const populate       = matrix => {
    const emptyRows = pipe(
      m2emptyPos,
      flat,
      removeEmpty
    )(matrix)
    return emptyRows.length ? pipe(pickRandomElem, addRnd2(matrix))(emptyRows) : matrix
}

const m2emptyPos     = matrix => matrix.map((row, x) => row.map((cell, y) => cell ? 0 : {x:x,y:y}))
const addRnd2        = matrix => pos => matrix.map((row, x) => row.map((cell, y) => (x === pos.x && y === pos.y) ? 2 : cell))

// Conditions
const isVerticalMove = move => move === NORTH || move === SOUTH 
const isValidMove    = state => move => JSON.stringify(state.matrix) !== JSON.stringify(nextMove(state.matrix)(move))
const isLose         = state => !isValidMove(state)(NORTH) && !isValidMove(state)(SOUTH) 
  && !isValidMove(state)(WEST) && !isValidMove(state)(EAST)

// Next values based on state
const nextMoves      = state => state.moves
const nextMatrix     = state => pipe(nextMove(state.matrix), populate)(getLastMove(state))
const nextIsWin      = state => pipe(nextMove(state.matrix), flat)(getLastMove(state)).some(e => e >= GOAL)
const nextIsLose     = state => pipe(nextMove(state.matrix), populate, stateFromMtx, isLose)(getLastMove(state))

// Utils
const stateFromMtx   = matrix => ({ matrix: matrix })

// Move mecanism
const getLastMove    = state => getLast(state.moves) 
const nextMove       = matrix => direction => isVerticalMove(direction) 
  ? verticalMove(matrix)(direction)
  : horizontalMove(matrix)(direction)
const verticalMove   = matrix => direction => [...matrix.keys()]
  .map(k => (direction === NORTH) ? move(col(matrix)(k)): pipe(reverse, move, reverse)(col(matrix)(k)))
  .map((_, k, matrix) => col(matrix)(k))
const horizontalMove = matrix => direction => [...matrix.keys()]
  .map(k => (direction === WEST) ? move(row(matrix)(k)) : pipe(reverse, move, reverse)(row(matrix)(k)))
const move           = xs => pipe(removeEmpty, mergeSquare, fill(xs.length))(xs)
const mergeSquare    = xs => xs
  .reduce((acc, e) => !isMergeable(getLast(acc),e) 
    ? acc.concat({value:e, isFrozen:false})
    : updateElem(acc.length-1,{value:e*2, isFrozen:true})(acc), [])
  .map(o => o.value)
const isMergeable = (o, v) => !o ? false : !o.isFrozen && o.value === v

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
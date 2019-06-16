const game = require("./2048")
Object.getOwnPropertyNames(game).map(p => global[p] = game[p])

var state = initialState()
state.matrix = [[2, 8, 32, 2], [32, 128, 64, 16],[8, 32, 16, 4],[2, 8, 4, 2]];
state = enqueue(state, WEST)
state = enqueue(state, WEST)
state = enqueue(state, NORTH)
state = enqueue(state, WEST)
state = enqueue(state, EAST)
state = enqueue(state, SOUTH)
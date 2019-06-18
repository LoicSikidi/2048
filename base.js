const pipe        = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
const prop        = k => o => o[k]
const merge       = o1 => o2 => Object.assign({}, o1, o2)
const rnd         = min => max => Math.floor(Math.random() * max) + min
const objOf       = k => v => ({ [k]: v })
const spec        = o => x => Object.keys(o)
 .map(k => objOf(k)(o[k](x)))
 .reduce((acc, o) => Object.assign(acc, o))
const initMatrix  = x => [...Array(x)].map(k => Array(x).fill(0))
const m2emptyPos  = matrix => matrix.map((row, x) => row.map((cell, y) => cell ? 0 : {x:x,y:y}))
const addRnd2     = matrix => pos => matrix.map((row, x) => row.map((cell, y) => (x === pos.x && y === pos.y) ? 2 : cell))
const flat        = matrix => matrix.reduce((acc, xs) => acc.concat(xs))
const col         = matrix => k => matrix.map(row => row[k])
const row         = matrix => k => matrix.slice(k, k+1)[0]
const getLast     = xs => xs.slice(xs.length-1, xs.length)[0]
const reverse     = xs => xs.slice(0).reverse()
const updateElem  = (k, v) => xs => xs.map((e,index) => (k===index) ? v : e)
const fill        = max => xs => xs.concat(Array(max - xs.length).fill(0))
const removeEmpty = xs => xs.filter(el => el)
const move        = xs => pipe(removeEmpty, mergeSquare, fill(xs.length))(xs)

//private functions
const mergeSquare = xs => xs
 .reduce((acc, e) => !isMergeable(getLast(acc),e) ? acc.concat({value:e, isFrozen:false}) : updateElem(acc.length-1,{value:e*2, isFrozen:true})(acc), [])
 .map(o => o.value)
const isMergeable = (o, v) => !o ? false : !o.isFrozen && o.value === v

module.exports = {pipe, prop, merge, getLast, initMatrix, rnd, move, flat, reverse, col, row, addRnd2, objOf, spec, m2emptyPos, removeEmpty, fill}
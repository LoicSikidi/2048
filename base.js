const pipe        = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
const prop        = k => o => o[k]
const merge       = o1 => o2 => Object.assign({}, o1, o2)
const rnd         = min => max => Math.floor(Math.random() * max) + min
const objOf       = k => v => ({ [k]: v })
const spec        = o => x => Object.keys(o)
 .map(k => objOf(k)(o[k](x)))
 .reduce((acc, o) => Object.assign(acc, o))
const initMatrix  = x => [...Array(x)].map(k => Array(x).fill(0))
const flat        = matrix => matrix.reduce((acc, xs) => acc.concat(xs))
const col         = matrix => k => matrix.map(row => row[k])
const row         = matrix => k => matrix.slice(k, k+1)[0]
const getLast     = xs => xs.slice(xs.length-1, xs.length)[0]
const reverse     = xs => xs.slice(0).reverse()
const updateElem  = (k, v) => xs => xs.map((e,index) => (k===index) ? v : e)
const fill        = max => xs => xs.concat(Array(max - xs.length).fill(0))
const removeEmpty = xs => xs.filter(el => el)

module.exports = {pipe, prop, merge, getLast, initMatrix, rnd, flat, reverse, col, row, objOf, spec, removeEmpty, updateElem, fill}
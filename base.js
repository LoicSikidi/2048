const pipe       = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
const prop       = k => o => o[k]
const dropFirst  = xs => xs.slice(1)
const initMatrix = length => [...Array(length)].map(k => Array(length).fill(0))
const rnd        = min => max => Math.floor(Math.random() * max) + min
const objOf      = k => v => ({ [k]: v })
const copyXs     = xs => xs.map(v => v)
const reverse    = xs => xs.slice(0).reverse()
const col        = matrix => k => matrix.map(row => row[k])
const row        = matrix => k => matrix.slice(k, k+1)
const up         = xs => {
    var newXs = copyXs(xs);
    for (let index = 0; index < newXs.length; index++) {
        if (index+1 >= newXs.length) {
            continue;
        }
        if(newXs[index+1] === 0){
            newXs[index+1] = newXs[index];
            newXs[index] = 0;
        }
        else if (newXs[index] === newXs[index+1]){
            newXs[index] = 0;
            newXs[index+1] = newXs[index+1] * newXs[index+1];
        }
    }
    return newXs;
}
const moveVertical = matrix => Object.keys(matrix)
  .map(k => pipe(reverse, up, reverse)(col(matrix)(k)))
  .reduce((acc, xs) => {
    acc.concat(xs.reduce((acc2,xs2,i) => {
      if(!acc2[i]){
          acc2[i] = []
      }        
      acc2[i].push(xs2)
    },[]))
    // for (let i = 0; i < xs.length; i++) {
    //   if(!acc[i]){
    //       acc[i] = []
    //   }
    //   acc[i].push(xs[i])
    // }
    return acc;
  }, [])
const addRnd2    = matrix => rndX => rndY => matrix.map((row,x) => row.map((cell, y) => (x === rndX && y === rndY) ? 2 : cell))
const spec       = o => x => Object.keys(o)
  .map(k => objOf(k)(o[k](x)))
  .reduce((acc, o) => Object.assign(acc, o))

module.exports = {pipe, prop, dropFirst, initMatrix, rnd, up, moveVertical, addRnd2, objOf, spec};

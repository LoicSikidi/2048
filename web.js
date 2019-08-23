const canvas = document.getElementById('canvas')

// Mutable state
let state = initialState()

const draw = () => {
    // Clean the DOM
    var child = canvas.lastElementChild
    while (child) { 
        canvas.removeChild(child)
        child = canvas.lastElementChild
    } 

    // Draw the grid content
    state.matrix.forEach(rows => {
        const newNode = document.createElement('div')
        newNode.className = 'box'
        rows.forEach(cell => {
            const newNestedNode = document.createElement('div')
            newNestedNode.className = (!cell) ? 'empty' : `square-${cell}`
            newNestedNode.innerHTML = (cell) ? cell : ''
            newNode.appendChild(newNestedNode)
        })
        canvas.appendChild(newNode)
    })
    // Handle loose behavior
    if(state.isLose) {
      setTimeout(() => {
        alert('You loose :(')
        state = initialState()
        draw()
      }, 200)
    }
}

// Key events
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'z': case 'ArrowUp':    state = enqueue(state, NORTH); break
    case 'a': case 'q': case 'ArrowLeft':  state = enqueue(state, WEST);  break
    case 's': case 's': case 'ArrowDown':  state = enqueue(state, SOUTH); break
    case 'd': case 'd': case 'ArrowRight': state = enqueue(state, EAST);  break
  }
  draw()
})

// Main
draw()
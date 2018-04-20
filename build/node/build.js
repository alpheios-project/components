const webpack = require('./webpack')
const sass = require('./sass')
const imagemin = require('./imagemin')
const config = require('./config')

const webpackTasks = {
  production: config.webpack.tasks.map(task => Object.assign(task, config.webpack.common)),
  development: config.webpack.devTasks.map(task => Object.assign(task, config.webpack.common))
}

let taskNamesAllowed = [
  'all', // Default one
  'images',
  'skins',
  'webpack'
]
let taskName = taskNamesAllowed[0]

let modesAllowed = [
  'production', // Default one
  'development'
]
let mode = modesAllowed[0]

for (let [index, value] of process.argv.entries()) {
  if (index === 2) {
    if (!taskNamesAllowed.includes(value)) {
      console.error(`
  The first parameter (task name) must be one of the following: ${taskNamesAllowed.map(t => '"' + t + '"').join(', ')}.
  With no parameters specified it will run all tasks at once.
     `)
      process.exit(1)
    }
    taskName = value
  }
  if (index === 3) {
    if (!modesAllowed.includes(value)) {
      console.warn(`
  The second parameter (mode name) must be one of the following: ${modesAllowed.map(t => '"' + t + '"').join(', ')}.
  With no parameters specified it will run in production mode.
     `)
      process.exit(1)
    }
    mode = value
  }
}

console.log(`Running "${taskName}" task(s) in "${mode}" mode`)
if (taskName === 'all') {
  // Run all build tasks in a sequence
  let imageminResult = imagemin.run(config.image)
  let skinsResult = sass.run(config.skins())
  Promise.all([imageminResult, skinsResult]).then(() => {
    webpack.run(webpackTasks[mode])
  })
} else if (taskName === 'images') {
  // Optimizes images for web
  imagemin.run(config.image)
} else if (taskName === 'skins') {
  // Creates output scss files
  sass.run(config.skins())
} else if (taskName === 'webpack') {
  webpack.run(webpackTasks[mode])
}

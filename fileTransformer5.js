const path = require('path')

module.exports = {
  process (src, filename, config, options) {
    let jsonName = JSON.stringify(path.basename(filename))
    console.log('******Ira 1 process')
    return {
      code: `
            {
            render: function (h) {
                return h('div', 'Hello, ${jsonName}!')
            }`
    }
  }
}

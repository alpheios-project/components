const path = require('path')

module.exports = {
  process (src, filename, config, options) {
    // let nameComp = filename.replace('.svg', '')
    let jsonName = JSON.stringify(path.basename(filename))

    // return 'module.exports = \'<img src="' + JSON.stringify(path.basename(filename)) + '">\''
    console.warn('***************** arguments src', src)
    console.warn('***************** arguments filename', filename)
    console.warn('***************** arguments config', config)
    console.warn('***************** arguments options', options)
    return {
      code: `{ template: '<img src="${jsonName}">' }`
    }
  }
}

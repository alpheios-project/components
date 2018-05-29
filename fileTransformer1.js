const path = require('path')

module.exports = {
  process (src, filename, config, options) {
    // let nameComp = filename.replace('.svg', '')
    let jsonName = JSON.stringify(path.basename(filename))

    // return 'module.exports = \'<img src="' + JSON.stringify(path.basename(filename)) + '">\''

    console.warn('***************** arguments 1', src, filename, config, options)

    return `'<img src="${jsonName}">'`
  }
}

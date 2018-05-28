const path = require('path')

module.exports = {
  process (src, filename, config, options) {
    return 'module.exports = \'<img src="' + JSON.stringify(path.basename(filename)) + '">\''
  }
}

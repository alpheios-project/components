import alias from 'rollup-plugin-alias'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import html from 'rollup-plugin-html'
import vue from 'rollup-plugin-vue'
import vueSvg from 'rollup-plugin-vue-svg'
import path from 'path'
const projectRoot = process.cwd()

module.exports = {
  input: './src/plugin.js',
  plugins: [
    resolve(),
    alias({
      resolve: [],
      '@': path.join(projectRoot, 'src')
    }),
    html({
      include: '**/*.htmlf'
    }),
    json(),
    vue(),
    vueSvg()
  ],
  output: {
    dir: './dist',
    file: 'rollup.js',
    format: 'es'
  }
}

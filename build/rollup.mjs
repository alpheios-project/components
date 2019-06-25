import rollup from 'rollup'
import alias from 'rollup-plugin-alias'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import html from 'rollup-plugin-html'
import vue from 'rollup-plugin-vue'
import vueSvg from 'rollup-plugin-vue-svg'
import path from 'path'
const projectRoot = process.cwd()

// see below for details on the options
const inputOptions = {
  input: './src/plugin.js',
  plugins: [
    resolve(),
    alias({
      resolve: ['.jsf'],
      'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
      'alpheios-wordlist': path.join(projectRoot, 'node_modules/wordlist/dist/alpheios-wordlist.js'),
      'vue-multiselect-css': path.join(projectRoot, 'node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
      '@': path.join(projectRoot, 'src')
    }),
    html({
      include: '**/*.htmlf'
    }),
    json(),
    vue(),
    vueSvg()
  ]
}
const outputOptions = {
  dir: './dist',
  file: 'rollup.js',
  format: 'es'
}

console.info(`Current dir is`, process.cwd())

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.watchFiles); // an array of file names this bundle depends on

  // generate code
  const { output } = await bundle.generate(outputOptions);

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.isAsset) {
      // For assets, this contains
      // {
      //   isAsset: true,                 // signifies that this is an asset
      //   fileName: string,              // the asset file name
      //   source: string | Buffer        // the asset source
      // }
      console.log('Asset', chunkOrAsset);
    } else {
      // For chunks, this contains
      // {
      //   code: string,                  // the generated JS code
      //   dynamicImports: string[],      // external modules imported dynamically by the chunk
      //   exports: string[],             // exported variable names
      //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
      //   fileName: string,              // the chunk file name
      //   imports: string[],             // external modules imported statically by the chunk
      //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
      //   isEntry: boolean,              // is this chunk a static entry point
      //   map: string | null,            // sourcemaps if present
      //   modules: {                     // information about the modules in this chunk
      //     [id: string]: {
      //       renderedExports: string[]; // exported variable names that were included
      //       removedExports: string[];  // exported variable names that were removed
      //       renderedLength: number;    // the length of the remaining code in this module
      //       originalLength: number;    // the original length of the code in this module
      //     };
      //   },
      //   name: string                   // the name of this chunk as used in naming patterns
      // }
      console.log('Chunk', chunkOrAsset.modules);
    }
  }

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build()
  .then(r => console.log(`Rollup process finished successfully`, r))
  .catch(e => console.log(`Rollup process failed`, e))
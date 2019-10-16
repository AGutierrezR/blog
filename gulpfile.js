const { watch, series, parallel } = require( 'gulp' );
const del = require( 'del' )
const cp = require( 'child_process' );
const browsersync = require( 'browser-sync' ).create();


// Limpieza de directorio _site/
function clean() {
  return del([ '_site' ]);
}

// Iniciando BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: '_site/'
    },
    port: 3000
  });
  done();
}

// Refrescando Navegador con BrowserSync
function browserSyncReload(done){
  browsersync.reload();
  done();
}

// Ejecutando comando Jekyll usando Spawn de Child_process
function jekyll() {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' });
}

// CSS
function css() {
  // TODO: Agregar soporte para Sass
}

// Monitoriando cambios
function watchFiles() {
  watch(
    [
      './_posts/**/*',
      './_layouts/**/*'
    ],
    series(jekyll, browserSyncReload)
  );
}

const build = series(clean, jekyll);
const w = parallel(watchFiles, browserSync);


// Exportando Tasks
exports.clean = clean;
exports.jekyll = jekyll;
exports.build = build;
exports.watch = w;

// Default
exports.default = build;

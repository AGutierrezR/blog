const { watch, series, parallel, src, dest } = require( 'gulp' );
const del = require( 'del' )
const cp = require( 'child_process' );
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const browsersync = require( 'browser-sync' ).create();

// Limpieza de directorio _site/
function clean() {
  return del([ '_site' ]);
}

// Iniciando BrowserSync
function browserSync(done) {
  browsersync.init({
		proxy: 'localhost:4000/blog/',
		injectChanges: true,
		watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
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

// Creacion de servidor para desarrollo
function jekyllServe() {
  return cp.spawn('bundle', ['exec', 'jekyll', 'serve', '--force_polling'], { stdio: 'inherit' });
}

// CSS
function css() {
  // TODO: Agregar soporte para Sass
  return src('./scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
    .pipe(dest('./assets/css/'))
    .pipe(dest('./_site/assets/css/'))
    .pipe(browsersync.stream());
}

// Monitoriando cambios
function watchFiles() {
  watch('./scss/**/*', css),
  watch(
    [
      './_layouts/**/*',
      './_pages/**/*',
      './_posts/**/*',
      './*.md',
      './*.markdown',
    ],
    browserSyncReload
  );
}


const serve = series(clean, jekyllServe);
const build = series(clean, jekyll);
const w = parallel(watchFiles, browserSync);


// Exportando Tasks
exports.serve = serve;
exports.css = css;
exports.clean = clean;
exports.jekyll = jekyll;
exports.build = build;
exports.watch = w;

// Default
exports.default = build;

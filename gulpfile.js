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
  return src('./scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
    .pipe(dest('./assets/css'))
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
      './*.md'
    ],
    series(jekyll, browserSyncReload)
  );
}

const build = series(clean, jekyll);
const w = series(build, parallel(watchFiles, browserSync));


// Exportando Tasks
exports.css = css;
exports.clean = clean;
exports.jekyll = jekyll;
exports.build = build;
exports.watch = w;

// Default
exports.default = build;

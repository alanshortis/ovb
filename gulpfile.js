const pkg = require('./package.json');
const paths = pkg.paths;

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const header = require('gulp-header');
const notifier = require('node-notifier');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const del = require('del');
const browserSync = require('browser-sync').create();

const fileHeader = `/* ${pkg.name} ${pkg.version} | ${new Date()} */\n`;


gulp.task('css', ['sasslint'], () => {
  return gulp.src(`${paths.src.sass}/**/*.scss`)
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', function(err) {
      sass.logError.call(this, err);
      notifier.notify({
        title: 'Gulp',
        message: 'SASS error'
      });
    })
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(header(fileHeader))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
});


gulp.task('sasslint', () => {
  return gulp.src(`${paths.src.sass}/**/*.scss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .on('error', () => {
      notifier.notify({
        title: 'Gulp',
        message: 'SASS liniting failed'
      });
    });
});


gulp.task('minify', ['css'], () => {
  return gulp.src(`${paths.dest.css}/style.css`)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(header(fileHeader))
    .pipe(gulp.dest(paths.dest.css));
});


gulp.task('js', ['eslint'], () => {
  return browserify({
    entries: `${paths.src.js}/ovb.js`,
    extensions: ['.js'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('ovb.js'))
    .pipe(buffer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest.js))
    .pipe(browserSync.stream());
});


gulp.task('eslint', () => {
  return gulp.src(['gulpfile.js', `${paths.src.js}/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', () => {
      notifier.notify({
        title: 'Gulp',
        message: 'JS liniting failed'
      });
    });
});


gulp.task('uglify', ['js'], () => {
  return gulp.src([`${paths.dest.js}/*.js`, `!${paths.dest.js}/*.min.js`])
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(header(fileHeader))
    .pipe(gulp.dest(paths.dest.js));
});


gulp.task('icons', () => {
  return gulp.src(`${paths.src.icons}/*.svg`)
    .pipe(svgo({
      plugins: [{removeStyleElement: true}]
    }))
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(paths.dest.icons));
});


gulp.task('clean', () => {
  return del.sync([paths.dest.js, paths.dest.css, paths.dest.icons]);
});


gulp.task('watch', ['css', 'js', 'icons'], () => {
  browserSync.init({
    server: {
      baseDir: paths.dest.dest,
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });
  gulp.watch(`${paths.src.sass}/**/*.scss`, ['css']); //
  gulp.watch(`${paths.src.js}/**/*.js`, ['js']);
});


gulp.task('deploy', () => {
  const args = minimist = require('minimist')(process.argv.slice(2));
  const remotePath = '/websites/ovbcycling.com/test/';
  const conn = ftp.create({
    host: args.host,
    user: args.user,
    password: args.password,
    log: gutil.log
  });
  gulp.src(['.htaccess', 'index.html', '404.html', 'css/*', 'js/*', 'fonts/*'], {buffer: false, dot: false, base: './'})
    .pipe(conn.dest(remotePath));
});


gulp.task('default', ['clean', 'minify', 'uglify', 'icons']);

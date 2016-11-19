const pkg = require('./package.json'),
      browserify = require('browserify'),
      del = require('del'),
      gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass')
      header = require('gulp-header'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      uglify = require('gulp-uglify'),
      notifier = require('node-notifier'),
      buffer = require('vinyl-buffer'),
      source = require('vinyl-source-stream');

const options = {
  "src": {
    "sass": "src/sass/**/*.scss",
    "js": "src/js"
  },
  "dest" : {
    "css": "",
    "js": "js"
  }
};

const jsHeader = `/* ${pkg.name} | ${new Date()} */\n`,
      cssHeader = `/* \nTheme Name: ${pkg.name} \nAuthor: ${pkg.author} \nAuthor URI: http://short.is \nVersion: ${pkg.version} \nBuild: ${new Date()}\n*/\n`


// Build CSS from SASS with sourcemaps and autoprefix.
gulp.task('css', () => {
  return gulp.src(options.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
    .on('error', function(err) {
      sass.logError.call(this, err);
      notifier.notify({
        title: 'Gulp',
        message: 'SASS error - see terminal for details.'
      });
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(header(cssHeader))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(options.dest.css));
});


// Minify CSS.
gulp.task('minify', ['css'], () => {
  return gulp.src(`style.css`)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(header(cssHeader))
    .pipe(gulp.dest(options.dest.css));
});


// Build our JS modules.
gulp.task('js', () => {
  return browserify({entries: `${options.src.js}/app.js`, extensions: ['.js'], debug: true})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${options.dest.js}/`));
});


// Remove debug stuff (console.log, alert), uglify and save with a .min suffix.
gulp.task('uglify', ['js'], () => {
  return gulp.src([`${options.dest.js}/*.js`, `!${options.dest.js}/**/*.min.js`])
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify({'mangle': false}))
    .pipe(header(jsHeader))
    .pipe(gulp.dest(options.dest.js));
});


// Remove generated assets.
gulp.task('clean', () => {
  return del.sync(['style.css', 'js', 'img']);
});


// Watch for changes.
gulp.task('watch', () => {
  gulp.watch(options.src.sass, ['css']);
});


// Default task.
gulp.task('default', ['clean', 'css']);

const pkg = require('./package.json');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const header = require('gulp-header');
const notifier = require('node-notifier');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const del = require('del');
const browserSync = require('browser-sync').create();


// Paths to sources and built assets.
const path = {
  src: {
    sass: './src/sass',
    js: './src/js',
    icons: './src/icons'
  },
  dest: {
    css: './',
    js: './js',
    icons: './icons'
  }
};


// Header comment for theme CSS and for minified assets.
const cssHeader = `/*\nTheme Name: ${pkg.name}\nDescription: ${pkg.description}\nAuthor: ${pkg.author}\nVersion: ${pkg.version}\n*/\n\n`;
const minifiedHeader = `/* ${pkg.name} ${pkg.version} | ${new Date()} */\n`;


// CSS: Build from SASS, add prefixes and sourcemaps.
gulp.task('css', ['sasslint'], () => {
  return gulp.src(`${path.src.sass}/**/*.scss`)
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
    .pipe(header(cssHeader))
    .pipe(gulp.dest(path.dest.css))
    .pipe(browserSync.stream());
});


// Lint our SASS files. See '.sass-lint.yml' for rules.
gulp.task('sasslint', () => {
  return gulp.src(`${path.src.sass}/**/*.scss`)
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


// Minify CSS.
gulp.task('minify', ['css'], () => {
  return gulp.src(`${path.dest.css}/style.css`)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(header(minifiedHeader))
    .pipe(gulp.dest(path.dest.css));
});


// JavaScript: Build from partials, add sourcemaps.
gulp.task('js', ['eslint'], () => {
  return browserify({entries: `${path.src.js}/ovb.js`, extensions: ['.js'], debug: true})
    .bundle()
    .pipe(source('ovb.js'))
    .pipe(buffer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dest.js))
    .pipe(browserSync.stream());
});


// Lint our JavaScript. See '.eslintrc' for rules.
gulp.task('eslint', () => {
  return gulp.src(['gulpfile.js', `${path.src.js}/*.js`])
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


// Uglify JavaScript.
gulp.task('uglify', ['js'], () => {
  return gulp.src([`${path.dest.js}/*.js`, `!${path.dest.js}/*.min.js`])
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(header(minifiedHeader))
    .pipe(gulp.dest(path.dest.js));
});


// Make an SVG sprite from individual icons.
gulp.task('icons', () => {
  return gulp.src(`${path.src.icons}/*.svg`)
    .pipe(svgo({
      plugins: [{removeStyleElement: true}]
    }))
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(path.dest.icons));
});


// Delete generated content.
gulp.task('clean', () => {
  return del.sync([path.dest.js, `${path.dest.css}/*.css`, path.dest.icons]);
});


// Watch for changes and update with browserSync.
gulp.task('watch', () => {
  browserSync.init({
    proxy: 'http://ovb.local',
    files: ['./**/*.php', './**/*.twig'] // Inject HTML when PHP or twig files change.
  });
  gulp.watch(`${path.src.sass}/**/*.scss`, ['css']); //
  gulp.watch(`${path.src.js}/**/*.js`, ['js']);
});


// Do it all (except watch).
gulp.task('default', ['clean', 'minify', 'uglify', 'icons']);

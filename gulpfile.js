import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import { deleteAsync as del } from 'del';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Copy

export const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/favicons/*",
    "source/*.ico",
], {
  base: "source"
})
    .pipe(gulp.dest("build"))
}

// Images

export const images = () => {
  return gulp.src('source/img/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

//SVG

export const svg = () => {
  return gulp.src('source/img/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'))
}

// Sprite

export const sprite = () => {
  return gulp.src('source/img/icons/*.svg')

    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true}
    ))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest("build/img"))
}

// HTML

export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"))
}

// WebP

export const webp = () => {
  return gulp.src('source/img/*.{jpg,png}')
  .pipe(squoosh({
    webp:{}
  }))
  .pipe(gulp.dest('build/img'))
}

// Clean

export const clean = () => {
  return del('build')
}

//Scripts

export const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

export const build = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    scripts,
    images,
    svg,
    sprite,
    html,
    webp
  )
)

export default gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    scripts,
    images,
    svg,
    sprite,
    html,
    webp
  ),
  gulp.series(
    server,
    watcher
  )
)


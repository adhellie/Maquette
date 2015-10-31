var autoprefixer = require('gulp-autoprefixer'),
  gulp = require('gulp'),
  uglify = require('gulp-uglify'), //import du gulp node package, chaque fois qu'on appel la commande gulp le package est importé
  browserSync = require('browser-sync'),
  browserify = require('gulp-browserify'),
  fs = require('fs'), //filesystem (jade)
  jade = require('gulp-jade'),
  yaml = require('js-yaml'), //jade
  postcss      = require('gulp-postcss'),
  sass = require('gulp-sass'),
  sourcemaps   = require('gulp-sourcemaps'),
  runSequence = require('run-sequence'),
  del = require('del'),
  stylus = require('gulp-stylus'),
  watch = require('gulp-watch'),
  imagemin = require('gulp-imagemin');

// Définir le dossier build



//Tâches 

//Images 

gulp.task('images', function(){
  return gulp.src('medias/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('build/medias/'))
});

gulp.task('fonts', function() {
  return gulp.src('medias/fonts/**/*')
  .pipe(gulp.dest('build/medias/fonts'))
})

//Scripts Task
// Uglifies and browserify
gulp.task('scripts', function() {
  //On veut que pour tous les fichiers js soit appliqué la tâche uglify.
  gulp.src('js/*.js') //on charge les fichiers
    .pipe(browserify({
      nobuiltins: 'events querystring'
    }))
    // .pipe(uglify()) //on minimise les fichiers chargés
    .pipe(gulp.dest('build/js')) //on range les nouveaux fichiers dans un nouveau répertoire.
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('one', function () {
  return gulp.src('css/styles.styl')
    .pipe(stylus())
    .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Build

gulp.task('build', function(callback) {
  runSequence('delete',
  [
    'templates',
    'scripts',
    'one',
    'images',
    'fonts'
  ],
  callback);
});

//Browser-sync
gulp.task('browserSync', ['build'], function() {
  browserSync({
    server: {
      baseDir: "build"
    },
    ghostMode : false,
    lockSnippets : false,
    open : false,

  });
});


//Watch Task
// Watches JS
gulp.task('watch', ['browserSync', 'one', 'templates', 'scripts'], function() {
  //On veut qu'a chaque modification d'un fichier cela soit repéré afin d'appliquer des tâches spécifiques.
  gulp.watch('js/**/*.js', ['scripts']); //regarde tous les fichiers ayant l'extenssion .js dans le dossier js
  gulp.watch('css/**/*.styl', ['one']);
  gulp.watch('pages/**/*.jade', ['templates']);
});

//Delete

gulp.task('delete', function() {
  del('build');
});

//Jade

gulp.task('templates', function() {

 
  gulp.src('pages/**/*.jade')
    .pipe(jade({
      locals: yaml.safeLoad(fs.readFileSync('locals/datas.json', 'utf8')),
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }))
});



gulp.task('default', ['watch']);

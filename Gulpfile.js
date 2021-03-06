/*-----------------------------------*\
  #Gulpfile: Automating tasks
\*-----------------------------------*/

process.env.DISABLE_NOTIFIER = true;
/**
 * LOAD PLUGINS
 */
var gulp          = require('gulp')
    ,gulpUtil     = require('gulp-util')
    ,bower        = require('gulp-bower')
    ,merge        = require('merge-stream')
    ,del          = require('del')
    ,rs           = require('run-sequence')
    ,notify       = require('gulp-notify')
    ,$            = require('gulp-load-plugins')();

var config = {
  stylesPath            : 'assets/src/scss'
  ,scriptsPath          : 'assets/src/js'
  ,buildPath            : 'assets/dist/'
}

/**
 * COMPILE SCRIPTS per template
 */
function compileScriptsTask(taskName, srcFiles, compiledFileName, destination){
    gulp.task(taskName, function() {
        return gulp.src(srcFiles)
            .pipe($.sourcemaps.init())
            .pipe($.concat(compiledFileName))
            .pipe($.uglify({ mangle: false }))
            .pipe(gulp.dest(config.buildPath + destination))
            .pipe(notify({message: compiledFileName + " complete", onLast: true}));
    });
}

/**
 * COMPILE STYLES per template
 */
function compileStylesTask(taskName, srcFiles, compiledFileName){
  gulp.task(taskName, function() {
      var style = gulp.src(srcFiles)
          .pipe($.sourcemaps.init())
          .pipe($.sass({outputStyle:'nested'}))
          .pipe($.autoprefixer({
              browsers: [
                  'last 2 version'
                  ,'> 1%'
                  ,'safari 5'
                  ,'ie 8'
                  ,'ie 9'
                  ,'opera 12.1'
                  ,'ios 6'
                  ,'ios 7'
                  ,'ios 8'
                  ,'ios 9'
                  ,'android 4'
              ],
              cascade: false
          }))
          .pipe($.rename({basename: compiledFileName}))
          .pipe($.cssmin())
          .pipe(gulp.dest(config.buildPath + '/css/'))
          .pipe($.size({title:'Styles'}))
          .pipe(notify({message: "Your" + compiledFileName + "is great again", onLast: true}));

      return merge(style);
  });
}

/**
 * Scripts
 */
compileScriptsTask('scripts', [
    config.scriptsPath + '/app.js',
    config.scriptsPath + '/controllers/alertsController.js',
    config.scriptsPath + '/controllers/clientsController.js'
], 'scripts.js', '/js');

/**
 * Scripts
 */
compileStylesTask('styles', [
  config.stylesPath + '/app.scss'
], 'app');

/**
 * WATCHING FOR CHANGES
 */
gulp.task('watch', function() {

  gulp.watch(config.stylesPath   + '/**/*', ['styles']);
  gulp.watch(config.scriptsPath  + '/**/*', ['scripts']);

});

/**
 * BUILD TASK
 */
gulp.task('build', function(cb) {
  rs(
    'clean'
    ,'scripts'
    ,'styles'
    ,cb
  );
});

/**
 * CLEAR CACHE
 */
gulp.task('clean', function(cb) {
  return del(
    [
      config.buildPath  + '/css/*'
      ,config.buildPath + '/js/scripts.js'
    ]
    ,{force: true}
    ,cb
  );
});

/**
 * DEFAULT TASK
 */
gulp.task('default', function(cb) {
  rs(
    'build'
    ,'watch'
    ,cb
  );
});

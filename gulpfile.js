var gulp = require('gulp');

var dest = require('gulp-dest');
var coffee = require('gulp-coffee');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('coffee', function() {
  gulp.src('./js/coffee/*.coffee')
    .pipe(coffee({bare: true}))
		.on('error', onError)
    .pipe(gulp.dest('./js/scripts/'));
});

gulp.task('default', function(){
  gulp.watch("./js/coffee/*.coffee", function(event){
    gulp.run('coffee');
  });
});

function onError(err) {
  console.log(err);
  this.emit('end');
}

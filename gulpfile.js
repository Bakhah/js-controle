var gulp = require('gulp');

var dest = require('gulp-dest');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('uglify', function(){
			gulp.src('./js/scripts/*.js')
				.pipe(uglify())
				.pipe(dest('.', {ext: '.min.js'}))
				.pipe(gulp.dest('./js'));
});

gulp.task('coffee', function() {
  gulp.src('./js/coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./js/scripts/'));
});

gulp.task('default', function(){
  gulp.watch("./js/coffee/*.coffee", function(event){
    gulp.run('coffee');
		gulp.run('uglify');
  });
});

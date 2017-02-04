var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
    console.log('***********************');
});

gulp.task('make', function(){
    return gulp.src('src/core/*.js')
        .pipe(concat('graphy.js'))
        .pipe(gulp.dest('build/v1.0.0'))
});
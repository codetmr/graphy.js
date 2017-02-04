// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var ugligy = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
    console.log('***********************');
});

gulp.task('make', function(){
    return gulp.src('src/core/*.js')
        .pipe(concat('graphy.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(ugligy())
        .pipe(gulp.dest('build/v1.0.0'))
});
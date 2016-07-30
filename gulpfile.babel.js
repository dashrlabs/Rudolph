import gulp from 'gulp';

import babel from 'gulp-babel';
import browserify from 'gulp-browserify';
import concat from 'gulp-concat';
import less from 'gulp-less';

const files = {
  html: './src/**/*.html',
  less: './src/less/**/*.less',
  rawJS: './src/**/*.js',
};

gulp.task('transpile', () =>
  gulp.src(files.rawJS)
    .pipe(babel())
    .pipe(gulp.dest('./build'))
);

gulp.task('browserify', ['transpile'], () =>
  gulp.src('./build/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./dist'))
);

gulp.task('html', () =>
  gulp.src(files.html)
    .pipe(gulp.dest('./dist'))
);

gulp.task('less', () =>
  gulp.src(files.less)
    .pipe(less())
    .pipe(concat('core.css'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('uikit-css', () =>
  gulp.src('./node_modules/uikit/dist/css/*.css')
    .pipe(gulp.dest('./dist'))
);

gulp.task('uikit-css-advanced', () =>
  gulp.src('./node_modules/uikit/dist/css/components/*.almost-flat.min.css')
    .pipe(concat('advanced.css'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('widget-css', () =>
  gulp.src('./node_modules/dashr-widget-*/dist/widget.css')
    .pipe(concat('widgets.css'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('uikit-fonts', () =>
  gulp.src('./node_modules/uikit/dist/fonts/**/*')
    .pipe(gulp.dest('./fonts'))
);

gulp.task('uikit-jquery', () =>
  gulp.src('./node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('./dist'))
);

gulp.task('uikit-js', () =>
  gulp.src('./node_modules/uikit/dist/js/uikit.js')
    .pipe(gulp.dest('./dist'))
);

gulp.task('uikit', ['uikit-css', 'uikit-css-advanced', 'widget-css', 'uikit-fonts', 'uikit-jquery', 'uikit-js']);

gulp.task('build', ['uikit', 'html', 'browserify', 'less']);

gulp.task('watch', ['build'], () => {
  gulp.watch(files.rawJS, ['browserify']);
  gulp.watch(files.html, ['html']);
  gulp.watch(files.less, ['less']);
});

/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function(options) {
  return () => {
    gulp.watch(`./${options.src}/js/**/*`, gulp.series(options.tasks.buildCustomJs, options.tasks.jsHint));

    gulp.watch(`./${options.src}/scss/**/*`, gulp.series(options.tasks.buildSass));

    const imagesWatcher = gulp.watch(`./${options.src}/images/**/*.+(${options.imageExtensions})`);

    imagesWatcher
      .on('unlink', (path) => {
        options.deleteFile({
          path,
          event: 'unlink'
        }, options.src, options.dest);
      })
      .on('add', gulp.series(options.tasks.imageMin));

    gulp.watch('./*.html', gulp.series(options.tasks.htmlHint));

    gulp.watch([`./${options.dest}/**/*`, './*.html'])
      .on('change', options.browserSync.reload);
  };

};
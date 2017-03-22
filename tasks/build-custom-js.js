/**
 * Build custom js
 */
'use strict';

const gulp = require('gulp'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      source = require('vinyl-source-stream');

module.exports = function(options) {

  return function() {
    return browserify({
        entries: `./src/js/app.js`,
        // Remove sourcemap for production
        debug: options.isProduction
      })
      .transform('babelify', {
        presets: ['es2015']
      })
      .bundle().on('error', function(err) {
        showError.apply(this, ['JS error', err])
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest(`./assets/js`));
  };

};
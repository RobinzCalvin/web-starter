/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const filesExist = require('files-exist');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

module.exports = function (options) {

  return (done) => {
    const jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);
    const noneES5 = jsVendors.es5.length === 0 ? true : false;
    const noneES6 = jsVendors.es6.length === 0 ? true : false;

    if (noneES5 && noneES6) {
      return done();
    } else if (noneES6) {
      return gulp.src(filesExist(jsVendors.es5))
        .pipe(concat(options.vendorJsMin))
        .pipe(gulpif(options.isProduction, uglify()))
        .pipe(gulp.dest(`./${options.dest}/js`));
    } else if (noneES5) {
      return gulp.src(filesExist(jsVendors.es6))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat(options.vendorJsMin))
        .pipe(gulpif(options.isProduction, uglify()))
        .pipe(gulp.dest(`./${options.dest}/js`));
    } else {
      return gulp.src(filesExist(jsVendors.es6))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(gulp.src(filesExist(jsVendors.es5)))
        .pipe(concat(options.vendorJsMin))
        .pipe(gulpif(options.isProduction, uglify()))
        .pipe(gulp.dest(`./${options.dest}/js`));
    }
  };
};
//importerar plugin från npm webbsida
import pkg from 'gulp';
const {src, dest, parallel, series, watch, gulp} = pkg;
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import cssnano from 'gulp-cssnano';
import sharpOptimizeImages from "gulp-sharp-optimize-images";
import babel from 'gulp-babel';

// sökvägar
export const files = {
    htmlPath: "src/**/*.html",
    CSSPath: "src/css/*.css",
    JSPath: "src/js/*.js",
    imagePath: "src/images/*"
}
//Kopierar html 
export function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub'));
}
//Kopierar CSS
export function copyCSS() {
    return src(files.CSSPath)
    .pipe(concat('main.css'))
    .pipe(cssnano())
    .pipe(dest('pub/css'));
}
//Kopierar JS
export function copyJS() {
    return src(files.JSPath)
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(babel({
      presets: ['@babel/env']
  }))
    .pipe(dest('pub/js'));
}
//optimerar bilder
export function yourImages() {
    return src(files.imagePath)
      .pipe(
        sharpOptimizeImages({

          avif_to_avif: {
            quality: 8,
            size:90,
          },
 
        })
      )
  
      .pipe(dest("pub/images"));
  }


// watch-task
export function watchTask(){
    parallel(copyCSS, copyJS,yourImages,),
    watch([files.htmlPath, files.CSSPath, files.JSPath, files.imagePath], parallel(copyHTML, copyCSS, copyJS, ))
}


export default series ( 
    parallel(copyCSS, copyJS,yourImages,),
    watchTask
)

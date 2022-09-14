// import fileInclude from 'gulp-file-include';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
import gulpPug from 'gulp-pug';

export const pug = () => {
  return app.gulp.src([app.path.src.html, "!./src/html/_*.pug", "!./src/html/blocks/*.pug", "!./src/html/base/*.pug"])
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      }))
    )
    // .pipe(fileInclude()) // в pug'е не нужен
    .pipe(gulpPug({
      // Сжатие HTML файла
      pretty: true,
      // Показывать в терминале какой файл обработан
      // verbose: true,
    }))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(
      app.plugins.if(
        app.isWebp,
        webpHtmlNoSvg())
      )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
}

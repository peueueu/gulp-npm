//Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


//Função para compilar o sass e adicionar os prefixos
function compilaSass() {
    return gulp
    .src('css/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}


//Task de gulp para a função de SASS
gulp.task('sass', compilaSass);

//Função para juntar os arquivos js

function gulpJS() {
    return gulp.src('js/main/*.js')
            .pipe(concat('main.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .on('error', (e)=>{
                console.log('>>>> ERROR', e);

                this.emit('end');
            })
            .pipe(uglify())
            .pipe(gulp.dest('./js'))
            .pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJS);

//JS Plugins

function pluginJS(){ 
    return gulp
    .src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/moment/min/moment.min.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./js'))
}

gulp.task('pluginjs', pluginJS);

//Função para iniciar o browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
}

//Task para iniciar o browser-sync
gulp.task('browser-sync', browser);

//Função de watch do gulp
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass)
    gulp.watch('js/main/*.js', gulpJS)
    gulp.watch('./*.html').on('change', browserSync.reload)
}

//Task para iniciar o watch
gulp.task('watch', watch);

//Task padrão do Gulp, que inicia watch e browser-sync em paralelo.
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));
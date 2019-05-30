const os = require('os');
const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const open = require('gulp-open');
const file = require('gulp-file');
const exit = require('gulp-exit');

async function scaffoldNewForm() {
  // récupère l'argument contenant le nom du formulaire à créer
  const nameArg = process.argv[process.argv.length - 1];

  // récupère le nom passé en propriété
  const indexOfName = nameArg.indexOf('=');
  const formName = nameArg.slice(indexOfName + 1);

  // template
  const template = `export const ${formName} = {
  // retourne l'identifiant unique
  id: '${formName}',

  // retourne true si le formulaire de la page web correspond
  isCurrent() {
    return false;
  },

  // pré-rempli le formulaire
  fillForm(data) {
    const champAPreRemplir = document.querySelector('#champ');

    // data contient les valeurs des champs à pré-remplir
    champAPreRemplir.value = data.champ;
  }
};
  `;

  // créé le fichier
  return gulp
    .src('./src/WebPageForms/forms/')
    .pipe(file(`${formName}.js`, template))
    .pipe(gulp.dest('./src/WebPageForms/forms/'))
    .pipe(exit());
}

// supprime le dossier ./dist
function clearDist() {
  return gulp.src('./dist', { allowEmpty: true }).pipe(clean());
}

function createFormsList() {
  return (
    gulp
      .src('./src/WebPageForms/forms/*.js')

      // agrège tous les fichiers dans un seul
      .pipe(concat('formsList.js'))

      .pipe(gulp.dest('dist/'))
  );
}

function copyStaticFiles() {
  const srcFiles = ['./public/icon.png', './public/manifest.json'];

  srcFiles.forEach(srcFile => {
    gulp.src(srcFile).pipe(gulp.dest('./dist'));
  });

  return Promise.resolve();
}

function openBrowser() {
  const browser =
    os.platform() === 'linux'
      ? 'google-chrome'
      : os.platform() === 'darwin'
      ? 'google chrome'
      : os.platform() === 'win32'
      ? 'chrome'
      : 'firefox';

  gulp.src('./ancillary/client/index.html').pipe(open({ app: browser }));
}

if (process.env.NODE_ENV === 'production') {
  exports.default = gulp.series(clearDist, copyStaticFiles, createFormsList);
} else {
  gulp.watch(['./src/WebPageForms/forms/*.js'], createFormsList);

  exports.default = gulp.series(copyStaticFiles, createFormsList, openBrowser);
}

exports.scaffoldNewForm = scaffoldNewForm;

import implement, { Interface, type } from 'implement-js';
import * as formsModules from 'dist/formsList';

describe('formsList.js', () => {
  test("L'utilitaire de vérification d'interface throw une erreur quand il manque une fonction", () => {
    const testFormObject = {
      id: 'testFormObject',
      isCurrent: () => {}
      // ... (fonction "fillForm()" manquante)
    };

    expect(() => {
      checkInterface(testFormObject);
    }).toThrow();
  });

  // teste les vrais fichier générés lors du build pour vérifier qu'ils respectent l'interface
  test("Les formulaires respectent l'interface", () => {
    expect(() => {
      checkInterface(formsModules);
    }).not.toThrow();
  });
});

// fonction support pour le test
function checkInterface(formsModules) {
  const formInterface = Interface('FormInterface')(
    {
      id: type('string'),
      isCurrent: type('function'),
      fillForm: type('function')
    },
    {
      error: true,
      warn: false, // évite la confusion d'avoir un message dans la console
      strict: true
    }
  );

  const formsKeys = Object.keys(formsModules);

  formsKeys.forEach(key => {
    implement(formInterface)(formsModules[key]);
  });
}

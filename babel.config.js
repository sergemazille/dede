// fichier nécessaire à Jest (permet d'utiliser "import / export" au lieu de "require / module.exports")
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
};

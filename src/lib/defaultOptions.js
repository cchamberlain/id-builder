export default {
  logging: {
    level: 'info'
  },

  tasks: {
    DirectoryCleaner: {
      enabled: true,
      paths: [ 'build' ]
    },

    BabelCompile: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    Copy: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    }
  }
};

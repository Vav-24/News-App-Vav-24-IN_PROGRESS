const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withResourceFix(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents += `
allprojects {
    configurations.all {
        resolutionStrategy {
            force 'androidx.appcompat:appcompat:1.7.0'
            force 'com.google.android.material:material:1.12.0'
        }
    }
}
`;
    }
    return config;
  });
};

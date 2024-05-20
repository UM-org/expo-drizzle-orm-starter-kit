const { withAppBuildGradle } = require('@expo/config-plugins');

const withModifyAppBuildGradle = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      const oldLine = 'apply from: "../../node_modules/react-native-prisma/react-native-prisma.gradle"';
      const newLine = 'apply from: "../../node_modules/@prisma/react-native/react-native-prisma.gradle"';
      
      const lines = config.modResults.contents.split('\n');
      const modifiedLines = lines.filter(line => line.trim() !== oldLine.trim());
      modifiedLines.push(newLine);
      
      config.modResults.contents = modifiedLines.join('\n');
    }
    return config;
  });
};

module.exports = withModifyAppBuildGradle;
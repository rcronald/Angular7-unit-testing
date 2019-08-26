// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const isDocker = require('is-docker')();

process.env.CHROME_BIN = require('puppeteer').executablePath()

//const ChromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision
//const Downloader = require('puppeteer/utils/ChromiumDownloader')
//const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision)
//process.env.CHROME_BIN = revisionInfo.executablePath


module.exports = function (config) {
  console.log("isDocker=" + isDocker)
  console.log("------------>" + process.env.CHROME_BIN)
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },  
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 80,
        functions: 80
      }
    },
    junitReporter: {
      outputDir: 'junit',
      outputFile: undefined,
      suite: '',
      useBrowserName: false,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {}
    },
    reporters: ['coverage-istanbul', 'mocha', 'progress', 'kjhtml', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: isDocker ? ['--no-sandbox'] : []
      }
    },
    singleRun: false
  });
};

module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/js/*.js',
      'test/unit/*.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],


    frameworks: ['jasmine'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'unit.xml',
      
    },
    autoWatch : false,
    singleRun: true,
    browsers : ['PhantomJS'],
    reporters: ['junit'],
    failOnEmptyTestSuite: false	

})}
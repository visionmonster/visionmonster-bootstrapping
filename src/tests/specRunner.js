/* global require */
'use strict';
require.config({
  baseUrl: './',
  packages:['/bundles-ui/packages'],
  paths: {
    jasmine: '/bundles-ui/jasmine/lib/jasmine-2.1.3/jasmine',
    'jasmine-html': '/bundles-ui/jasmine/lib/jasmine-2.1.3/jasmine-html',
    boot : '/bundles-ui/jasmine/lib/jasmine-2.1.3/boot',
    core : '/bundles-ui/packages/core',
    corefooter : '/bundles-ui/packages/core-footer',
    spec: 'spec'
  },
  /*map: {
    '*' : {
      'src/views/CoreFooterView' : '../../packages/CoreFooterView'
    }
  },*/
  shim: {
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    boot: {
      deps: ['jasmine', 'jasmine-html'],
      exports: 'jasmine'
    }
  }
});
//require(['boot'],function(jasmine){
  require(['core','boot','corefooter'],function(core,jasmine,corefooter){
    require([
      'jquery',
      'underscore',
      'backbone',
      'i18n'
      ],function($,_,Backbone,i18n){
        //console.log(require);

        console.log('after require: time',new Date());
        console.log('backbone',Backbone.VERSION);
        //console.log('corefooterview',CoreFooterView);
        window.onload();
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var specs = [];

        specs.push('spec/footer_spec');
        $(function () {
          require(specs, function (spec) {
            jasmineEnv.execute();
          });
        });

      });
  });



/*
require(['/packages-ui/packages/core.js'],function(core){
  require(['/packages-ui/jasmine/lib/jasmine-2.1.3/jasmine.js'],function(){
    require(['jquery',
    'underscore',
    'backbone',
    'i18n','/packages-ui/jasmine/lib/jasmine-2.1.3/jasmine-html.js'],function($,_,Backbone,i18n,jasmine){
    console.log($);
    console.log(_);
    console.log(Backbone);
    console.log(i18n);
    console.log(jasmine);

      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;
      var htmlReporter = new jasmine.HtmlReporter();

      jasmineEnv.addReporter(htmlReporter);

      jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };

      var specs = [];
      $(function(){
        require(specs, function(){
        jasmineEnv.execute();
      });
    });
    });
  });
});

/*


  require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/models/TodoSpec');
    specs.push('spec/views/ClearCompletedSpec');
    specs.push('spec/views/CountViewSpec');
    specs.push('spec/views/FooterViewSpec');
    specs.push('spec/views/MarkAllSpec');
    specs.push('spec/views/NewTaskSpec');
    specs.push('spec/views/TaskListSpec');
    specs.push('spec/views/task/TaskViewSpec');
    specs.push('spec/views/task/ViewTaskViewSpec');
    specs.push('spec/views/task/EditTaskViewSpec');


    $(function(){
      require(specs, function(){
        jasmineEnv.execute();
      });
    });

  });




require([
    '/packages-ui/jasmine-tests/lib/jasmine-2.1.3/jasmine',

    'jquery',
    'underscore',
    'backbone',
    'i18n'
    ],function($,_,Backbone,i18n){
      jasmineEnv = jasmine.getEnv();
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;
      var htmlReporter = new jasmine.HtmlReporter();
      jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };
      var specs = [];
    }
    );
*/





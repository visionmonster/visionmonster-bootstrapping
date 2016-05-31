//App
//---------------
//
/**
 * @module App
 */
//RequireJS includes:
define(['jquery',
    'underscore',
    'backbone',
    'i18n',
    'controllers/MainController'
  ],
  function($,
    _,
    Backbone,
    i18n,
    MainController
  ) {
    'use strict';
    return Backbone.View.extend(
      /**
       * @lends! App.prototype
       */
      /**
       * @constructs App
       * @memberof module:App
       * @classdesc main application
       * @augments Backbone.View
       * @requires module:router/Router
       * @property {string} name name of the view
       * @property {Object} views references to views used
       * @property {Object} models references to models used
       * @property {Object} controllers references to controllers used for different sections
       * @property {Object} currentEvent reference to current route Event
       * @property {Object} readyApp ready state of various sub views
       * @property {Boolean} appStarted is the app started?
       * @property {Array} trackEvents array of events to track
       */

      {
        /**
         * initialize - intizalize the main application
         *
         * @param  {Object} options Backbone view appoptions
         * @see LCApp
         */
        initialize: function(options) {
          this.name = 'App';
          //i18n.addResourceBundle('en', 'translation', JSON.parse(translation));
          this.initConfig();
          this.initModels();
          this.initControllers();
          this.addListeners();
        },
        initConfig: function(){
          i18n.init({ resStore: {},lng:'en',fallbackLng: 'en'},function(t){
              _.mixin({t:t});
          });
          _.templateSettings.variable = 'data';
        },
        /**
         * initModels - intialize the models used
         * @see module:models/ReadyModel
         * @see module:models/AppConfigurationModel
         */
        initModels: function() {
          this.models = {};
        },
        initControllers: function(){
          this.controllers = {};
          this.controllers.default = new MainController({
            el: $('.t-main')
          });
        },
        /**
         * initViews - Intialize basic views used in the app,
         *
         */
        initViews: function() {
          this.views = {};
          //create the controller to handle agency routes
        },
        /**
         * addListeners - add application listeners
         * @event ReadyModel@change:ready
         */
        addListeners: function() {
          this.listenTo(Backbone, 'app:view',this.changeView);
        },
        /**
         * changeView - called after a route has been triggered and the app is ready
         *
         * @param  {Object} _event routeEvent data
         */
        changeView: function(_event) {
          console.log('changeView',_event.controller);
          //broadcast the event type and the routeEvent object for the controllers to listen to
          Backbone.trigger(_event.controller, _event);
        }
      });
  }
);

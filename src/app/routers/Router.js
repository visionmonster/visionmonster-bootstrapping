//AphirmRouter
//---------------
//
/**
 * @module routes/AphirmRouter
 */
//RequireJS includes:
define([
  'backbone',
], function(Backbone) {
  'use strict';
  return Backbone.Router.extend(
    /**
     * @lends AphirmRouter.prototype
     */
    /**
     * @constructs AphirmRouter
     * @memberof module:routes/AphirmRouter
     * @classdesc handles all routing (url hashes) for the application
     * @augments Backbone.Router
     * @requires Backbone
     * @property {Object} app main application that this router is attached
     * @property {Object} routes list of different routes (hash urls) that the app listens to
     */
    {
      app: null,
      routes: {
        //agency overview route
        //catch all route when the presented route is not known
        '*default': 'defaultRoute'
      },
      /**
       * initialize - description
       *
       * @return {type}  description
       */
      initialize: function() {
        //console.log('initializing');
        //this.route(/client\/(view|edit)\/(\d*\:\d*)/,"clientRoute");
      },
      /**
       * defaultRoute - catch all route to do something if not known basically send them to home page
       *
       * @param  {string} value url splat,
       * @see agencyRoute
       */
      defaultRoute: function(value) {
        console.log('default route');
        var _route = {};
        _route.controller = 'view:main';
        _route.view = 'main';
        this.changeView(_route);
        //route.
      },
      /**
       * changeView - notifiy the app that the route changed
       *
       * @param  {Object} vo LCRouteEvent
       */
      changeView: function(vo) {
        //trigger the application to change / update the view
        Backbone.trigger('app:view', vo);
      }
    });
});

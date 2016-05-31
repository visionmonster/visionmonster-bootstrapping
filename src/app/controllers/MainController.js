//MainController
//---------------
//
/**
 * @module controllers/MainController
 */
//RequireJS includes:
define(['jquery', 'underscore', 'backbone',
  'views/main/MainView',
  'models/main/MainModel',
], function($, _, Backbone,
  MainView,
  MainModel) {
  'use strict';
  return Backbone.View.extend(
    /**
     * @lends! MainController.prototype
     */
    /**
     * @constructs MainController
     * @memberof module:controllers/MainController
     * @classdesc Creates a controller
     * @augments Backbone.View
     * @requires module:views/MainView
     * @requires module:models/MainModel
     */
    {
      /**
       * initialize - description
       *
       * @param  {object} options standard Backbone options element, should define $el
       *
       */
      initialize: function(options) {
        this.initConfig();
        this.initModels();
        this.initViews();
        this.addListeners();
      },
      initConfig: function(){
        //name the view
        this.name = 'MainController';
        //create main content DOM
        this.main = $('<main role="main" class="col-sm-9">');
      },
      /**
       * addListeners - add application level event listeners
       *
       * @listens module:Backbone~app:started
       * @callback! appStarted
       * @listens module:models/RouteDataModel~change
       * @callback! routeChange
       */
      //add application event listeners
      addListeners: function() {
        this.listenTo(Backbone, 'view:main', this.setRouteData);
        this.listenTo(this.models.routeData,'change',this.routeChange);
      },
      /**
       * initViews - initialize the views
       * @see module:views/client/ClientListView
       * @see module:views/agency/AgencyOverviewNavigation
       * @see module:views/client/ClientListFilterView
       * @see module:views/client/ClientListView
       */
      //initialize the views
      initViews: function() {
        this.views = {};
        this.views.main = new MainView({
          el: this.main
        });
      },
      /**
       * initModels - initialize the models
       * @see module:models/RouteDataModel
       * @see module:models/client/ClientSearchModel
       */
      //initialize the models
      initModels: function() {
        this.models = {};
        //route data model
        this.models.routeData = new Backbone.Model({rendered:false});
        //search for a client model
      },
      setRouteData : function(_routeData){
        console.log('setting route data');
        this.models.routeData.set(_routeData);
      },
      /**
       * routeChange - description
       *
       * @param  {type} _model route Data model
       * @fires Backbone#main:render:_viewname_
       */
      routeChange: function() {
        var _model = this.models.routeData;
        //if the base DOM elements aren't rendered, render them
        if (_model.get('rendered') === false) {
          this.render();
        }
        console.log('_model:',_model.toJSON());
        Backbone.trigger('main:render:' + _model.get('view'),_model.toJSON());
      },
      /**
       * render - description
       * @fires Backbone#agency:render
       * @see AgencyController#emptyView
       */
      render: function() {
        var _model = this.models.routeData;
        //empty all the DOM elements so you don't get duplicate elements
        this.$el.empty();
        //the controllers $el element is used as a holder, so we don't have lot of DOM event listeners attached to it, and we can clean them up as needed
        this.$el.append(this.main);
        _model.set('rendered',true,{silent:true});
      }
    });
});

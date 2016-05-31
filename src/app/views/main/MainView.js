//MainView
//---------------
//
/**
 * @module views/agency/MainView
 */
//RequireJS includes:
define(['jquery',
 'underscore',
 'backbone',
 'text!templates/main/mainTemplate.tpl'
], function($,
   _,
   Backbone,
   mainTemplate) {
  'use strict';
  return Backbone.View.extend(
    /**
     * @lends! MainView.prototype
     */
    /**
     * @constructs MainView
     * @memberof module:views/MainView
     * @classdesc creates a main view
     * @augments Backbone.View
     */
    {
      /**
       * initialize - initialize this view
       * @see addListeners
       */
      initialize: function() {
        //call createTemplates
        this.createTemplates();
        //call addListeners
        this.addListeners();
      },
      /**
       * createTemplates - create underscore templates
       *
       * @return {type}  description
       */
      createTemplates : function(){
        this.templates = {};
        this.templates.main = _.template(mainTemplate);
      },
      /**
       * addListeners - description
       * @event Backbone#agency:render
       * @event Backbone#agency:change:navigation
       * @see render
       * @see changeNavigation
       */
      addListeners: function() {
        //add listener to know when to render
        this.listenTo(Backbone, 'main:render:main', this.render);
      },
      /**
       * render - render the main navigation template
       *
       * @param  {Object} _event event object
       */
      render: function(_event) {
        //create DOM element from template
        var template = $(this.templates.main({}));
        //add template as the first child of the views element
        this.$el.prepend(template);
        //highlight the correct navigation section
      }
    });
});

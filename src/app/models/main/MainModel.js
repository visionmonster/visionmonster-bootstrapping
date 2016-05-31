//RouteModel
//---------------
//
/**
 * @module models/RouteModel
 */
//RequireJS includes:
define(['jquery',
  'underscore',
  'backbone',
  'i18n'
], function($, _, Backbone, i18n) {
  'use strict';
  return Backbone.Model.extend(
    /**
     * @lends! RouteModel.prototype
     */
    /**
     * @constructs RouteModel
     * @memberof module:models/RouteModel
     * @classdesc contains RouteDataModel wrapper
     * @augments Backbone.Model
     * @requires LCModel
     * @property {string} name of this instance
     * @property {object} defaults high level Event model
     */
    {
      name: 'RouteModel',
      defaults: {
        type: null,
        view: null,
        data: {}
      }
    });
});

/* global require */
require.config({
    paths: {
        'jquery': 'utilities/jquery-2.2.3.min',
        'underscore': 'utilities/underscore-1.8.3.min',
        'backbone': 'utilities/backbone-1.3.3.min',
        'i18n': 'utilities/i18next-2.0.min',
        'text': 'utilities/text-2.0.15',
        'views': 'views',
        'controllers': 'controllers',
        'models': 'models',
        'routers': 'routers',
        'templates': 'templates',
        'locales': 'locale',
    }
});
require([
	'jquery',
	'underscore',
	'backbone',
	'App',
	'routers/Router'
], function($, _, Backbone, App, Router) {
'use strict';
var _app = new App({
    router: new Router()
});
Backbone.history.start();
});

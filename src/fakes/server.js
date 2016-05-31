require.config({
	paths:{
		sinon: 'fakes/sinon-1.12.2',
		fakes: 'fakes/json'
	}
});
define([
	'sinon',
	'text!fakes/CoreHeadConfig.json'
	],function(sinon,config){
		'use strict';
		return {
			server: null,
			startServer : function(){
				this.server = sinon.fakeServer.create();
				var fakes = {
					config : config
				};
//				this.server.respondWith('GET',/\/HWBE\/person\/11:3.*/,[200,{"Content-Type" : "application/json"},fakes.dsJSON]);
				this.server.respondWith('GET',/\/rest\/config\/nav/, [200,{"Content-Type" : "application/json"},fakes.config]);
			},
			stopServer : function(){
				this.server.restore();
			},
			respond :function(){
				this.server.respond();
			}
		};
	});
define(['CoreFooterView'],function(CoreFooterView){
return describe("Test core footer",function(){
		var cfv = new CoreFooterView({el:$('body > footer')});
		beforeEach(function(){

		});
		afterEach(function(){
			$('body > footer').empty();
		});
		it('CoreFooterView rendered',function(){
			cfv.render();
			expect($('body > footer').children().length).toBe(1);
		});
	});
});

//define(['/bundles-ui/packages/core.js','../../src/views/CoreFooterView'],function(core,CoreFooter){
	//define(['corefooterview'],function(CoreFooterView){
//		var cfv = require(['/bundles-ui/packages/CoreFooterView.js'],function(CoreFooter)

	//cfv = new CoreFooterView();

//	console.log('footer spec CoreFooterView',CoreFooterView);
	//console.log('footer_spec');

//});

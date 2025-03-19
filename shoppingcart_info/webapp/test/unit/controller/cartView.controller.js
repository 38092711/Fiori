/*global QUnit*/

sap.ui.define([
	"sync6cl1/shoppingcart_info/controller/cartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("cartView Controller");

	QUnit.test("I should test the cartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

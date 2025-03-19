/*global QUnit*/

sap.ui.define([
	"sync6cl1/cart_edit/controller/cartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("cartView Controller");

	QUnit.test("I should test the cartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

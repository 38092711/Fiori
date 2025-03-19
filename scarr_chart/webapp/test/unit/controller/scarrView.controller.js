/*global QUnit*/

sap.ui.define([
	"sync6cl1/scarr_chart/controller/scarrView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("scarrView Controller");

	QUnit.test("I should test the scarrView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

/*global QUnit*/

sap.ui.define([
	"sync6cl1a22/split_event/controller/SplitView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SplitView Controller");

	QUnit.test("I should test the SplitView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

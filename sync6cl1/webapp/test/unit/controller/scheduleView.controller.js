/*global QUnit*/

sap.ui.define([
	"sync6cl1/sync6cl1/controller/scheduleView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("scheduleView Controller");

	QUnit.test("I should test the scheduleView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

/*global QUnit*/

sap.ui.define([
	"sync6cl1/seats_chart/controller/seatsView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("seatsView Controller");

	QUnit.test("I should test the seatsView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

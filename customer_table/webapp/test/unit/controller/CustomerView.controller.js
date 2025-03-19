/*global QUnit*/

sap.ui.define([
	"sync6cl1/customer_table/controller/CustomerView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CustomerView Controller");

	QUnit.test("I should test the CustomerView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

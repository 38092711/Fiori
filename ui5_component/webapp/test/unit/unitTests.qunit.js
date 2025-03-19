/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"smc6cl1/ui5_component/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});
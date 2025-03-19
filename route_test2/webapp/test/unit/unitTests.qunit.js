/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"sync6cl1/route_test2/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});
/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"synccl6/route_test/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});
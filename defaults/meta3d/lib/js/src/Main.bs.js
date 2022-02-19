'use strict';

var ExtensionManager$Meta3d = require("./ExtensionManager.bs.js");

var prepare = ExtensionManager$Meta3d.prepare;

var registerExtension = ExtensionManager$Meta3d.register;

var getServiceExn = ExtensionManager$Meta3d.getServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionStateExn = ExtensionManager$Meta3d.getExtensionStateExn;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

exports.prepare = prepare;
exports.registerExtension = registerExtension;
exports.getServiceExn = getServiceExn;
exports.setExtensionState = setExtensionState;
exports.getExtensionStateExn = getExtensionStateExn;
exports.buildAPI = buildAPI;
/* No side effect */
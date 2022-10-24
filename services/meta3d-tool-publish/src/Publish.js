"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const most_1 = require("most");
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
function _throwError(msg) {
    throw new Error(msg);
}
function _checkNotEmpty(value) {
    return value === undefined || value === null ?
        _throwError("empty") : value;
}
function _searchProtocolVersion(name, dependencies) {
    return _checkNotEmpty(dependencies[name]);
}
function _convertToExtensionOrContributePackageData({ name, protocol, publisher, dependentExtensionNameMap, dependentContributeNameMap, dependencies }) {
    return {
        name,
        publisher,
        protocol: {
            name: protocol.name,
            version: _searchProtocolVersion(protocol.name, dependencies)
        },
        dependentExtensionNameMap: Object.fromEntries(Object
            .entries(dependentExtensionNameMap)
            .map(([key, { protocolName }]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])),
        dependentContributeNameMap: Object.fromEntries(Object
            .entries(dependentContributeNameMap)
            .map(([key, { protocolName }]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }]))
    };
}
function _defineWindow() {
    global.window = {};
}
function _getFileDirname(fileType) {
    switch (fileType) {
        case "extension":
            return "extensions";
        case "contribute":
            return "contributes";
    }
}
function _getPublishedCollectionName(fileType) {
    switch (fileType) {
        case "extension":
            return "publishedextensions";
        case "contribute":
            return "publishedcontributes";
    }
}
function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, getFileIDFunc], packageFilePath, distFilePath, fileType) {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
        return initFunc().map(backendInstance => [backendInstance, packageJson]);
    }).flatMap(([backendInstance, packageJson]) => {
        let account = packageJson.publisher;
        return (0, PublishUtils_1.isPublisherRegistered)(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("找不到publishser，请至少登录过一次");
            }
            _defineWindow();
            let packageData = _convertToExtensionOrContributePackageData(packageJson);
            let filePath = _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer";
            // TODO perf: only invoke getShopImplementAccountDataFunc once
            return (0, most_1.fromPromise)(getShopImplementAccountDataFunc(backendInstance, _getPublishedCollectionName(fileType), account).then(([shopImplementAccountData, _]) => {
                let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData);
                return isContainFunc(({ protocolName, protocolVersion, name, version }) => {
                    return protocolName === packageJson.protocol.name
                        && name === packageJson.name
                        && version === packageJson.version;
                }, resData);
            }).then((isContain) => {
                if (isContain) {
                    _throwError("version: " + packageJson.version + " already exist, please update version");
                }
            })).flatMap(_ => uploadFileFunc(backendInstance, filePath, generateFunc(packageData, readFileSyncFunc(distFilePath, "utf-8"))).flatMap((uploadData) => {
                let fileID = getFileIDFunc(uploadData, filePath);
                return (0, most_1.fromPromise)(getShopImplementAccountDataFunc(backendInstance, _getPublishedCollectionName(fileType), account).then(([shopImplementAccountData, shopImplementCollectionData]) => {
                    let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData);
                    let data = {
                        protocolName: packageData.protocol.name,
                        protocolVersion: packageData.protocol.version,
                        name: packageJson.name,
                        version: packageJson.version,
                        fileID
                    };
                    return addShopImplementDataToDataFromShopImplementCollectionDataFunc(resData, data).then(resData => {
                        return updateShopImplementDataFunc(backendInstance, _getPublishedCollectionName(fileType), account, buildShopImplementAccountDataFunc(resData, account), shopImplementCollectionData);
                    });
                }));
            }));
        });
    }).drain()
        .then(_ => {
        logFunc("publish success");
    })
        .catch(e => {
        errorFunc("error message: ", e);
    });
}
exports.publish = publish;
//# sourceMappingURL=Publish.js.map
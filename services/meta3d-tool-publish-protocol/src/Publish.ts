import { fromPromise } from "most";
import { getLimitCount, isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"

function _throwError(msg: string): never {
    throw new Error(msg)
}

function _getPublishedCollectionName(fileType: "extension" | "contribute") {
    switch (fileType) {
        case "extension":
            return "publishedextensionprotocols"
        case "contribute":
            return "publishedcontributeprotocols"
    }
}

function _isPNG(iconPath: string) {
    return iconPath.match(/\.png$/) !== null
}


function _isEmpty(value: any) {
    return value === undefined || value === null
}


export function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getMarketProtocolCollectionFunc, isContainFunc, addDataToMarketProtocolCollectionFunc, addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc, getDataFromMarketProtocolCollectionFunc, parseMarketCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any, any], packageFilePath: string, iconPath: string, fileType: "extension" | "contribute") {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(backendInstance => [backendInstance, packageJson])
    }).flatMap(([backendInstance, packageJson]) => {
        let account = packageJson.publisher

        return isPublisherRegistered(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("找不到publishser，请在平台上注册该用户")
            }

            if (!_isPNG(iconPath)) {
                _throwError("icon's format should be png")
            }

            return fromPromise(
                // TODO support > 1000
                getMarketProtocolCollectionFunc(
                    backendInstance,
                    parseMarketCollectionDataBodyFunc,
                    _getPublishedCollectionName(fileType),
                    getLimitCount(),
                    0
                ).then(res => {
                    let resData = getDataFromMarketProtocolCollectionFunc(res)

                    return isContainFunc(
                        ({ name, version }) => {
                            return name === packageJson.name && version === packageJson.version
                        },
                        resData
                    ).then(isContain => [isContain, resData])
                }).then(([isContain, resData]) => {
                    if (isContain) {
                        _throwError("version: " + packageJson.version + " already exist, please update version")
                    }

                    return addDataToMarketProtocolCollectionFunc(backendInstance,
                        addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc,
                        _getPublishedCollectionName(fileType),
                        _getPublishedCollectionName(fileType),
                        resData,
                        {
                            name: packageJson.name,
                            version: packageJson.version,
                            account: account,
                            iconBase64:
                                // TODO check file size should be small(< 10kb)

                                // TODO icon can be any format include png

                                "data:image/png;base64, " + readFileSyncFunc(iconPath, "base64"),
                            displayName: _isEmpty(packageJson.displayName) ? packageJson.name : packageJson.displayName,
                            repoLink: _isEmpty(packageJson.repoLink) ? "" : packageJson.repoLink,
                            description: _isEmpty(packageJson.description) ? "" : packageJson.description,
                        }
                    )
                }))
        })
    }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}

function _getPublishedConfigCollectionName(fileType: "extension" | "contribute") {
    switch (fileType) {
        case "extension":
            return "publishedextensionprotocolconfigs"
        case "contribute":
            return "publishedcontributeprotocolconfigs"
    }
}

export function publishConfig([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getMarketProtocolCollectionFunc, isContainFunc, addDataToMarketProtocolCollectionFunc, addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc, getDataFromMarketProtocolCollectionFunc, parseMarketCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any, any], packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(backendInstance => [backendInstance, packageJson])
    }).flatMap(([backendInstance, packageJson]) => {
        let account = packageJson.publisher

        return isPublisherRegistered(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("找不到publishser，请在平台上注册该用户")
            }

            let collectioName = _getPublishedConfigCollectionName(fileType)

            return fromPromise(
                // TODO support > 1000
                getMarketProtocolCollectionFunc(
                    backendInstance,
                    parseMarketCollectionDataBodyFunc,
                    collectioName,
                    getLimitCount(),
                    0
                ).then(res => {
                    let resData = getDataFromMarketProtocolCollectionFunc(res)

                    return isContainFunc(
                        ({ name, version }) => {
                            return name === packageJson.name && version === packageJson.version
                        },
                        resData).then(isContain => [isContain, resData])
                }).then(([isContain, resData]) => {
                    if (isContain) {
                        _throwError("version: " + packageJson.version + " already exist, please update version")
                    }

                    return addDataToMarketProtocolCollectionFunc(backendInstance,
                        addMarketProtocolDataToDataFromMarketProtocolCollectionDataFunc,
                        collectioName,
                        collectioName,
                        resData,
                        {
                            name: packageJson.name,
                            version: packageJson.version,
                            account: packageJson.publisher,
                            configStr:
                                // TODO check file size should be small(< 10kb)

                                readFileSyncFunc(distFilePath, "utf8")
                        }
                    )
                }))
        })
    }).drain()
        .then(_ => {
            logFunc("publish config success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}
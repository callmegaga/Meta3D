"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPublishApps = exports.findPublishApp = exports.publish = exports._buildKey = void 0;
const most_1 = require("most");
const Main_1 = require("../../../../../utils/meta3d-backend-cloudbase/src/Main");
let _buildFileName = (appName, account) => account + "_" + appName;
let _buildKey = (appName, account) => (0, Main_1.handleKeyToLowercase)(_buildFileName(appName, account));
exports._buildKey = _buildKey;
let publish = ([onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc], appBinaryFile, appName, account, description) => {
    let key = (0, exports._buildKey)(appName, account);
    return hasDataFunc("publishedapps", key).concatMap((isExist) => {
        let fileName = _buildFileName(appName, account);
        let filePath = "apps/" + fileName + ".arrayBuffer";
        return uploadFileFunc(onUploadProgressFunc, filePath, appBinaryFile, fileName).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath);
            if (isExist) {
                return (0, most_1.fromPromise)(updateDataFunc("publishedapps", key, {
                    account,
                    appName,
                    description,
                    fileID
                }));
            }
            return (0, most_1.fromPromise)(addDataFunc("publishedapps", key, {
                account,
                appName,
                description,
                fileID
            }));
        });
    });
};
exports.publish = publish;
// export let enterApp = (appBinaryFile: ArrayBuffer) => {
// 	// TODO open new url with ?account, appName
// 	// let _meta3DState = loadApp(_findAppBinaryFile(account, appName))
// 	let _meta3DState = loadApp(appBinaryFile)
// }
let findPublishApp = ([getDataByKeyFunc, downloadFileFunc], account, appName) => {
    return (0, most_1.fromPromise)(getDataByKeyFunc("publishedapps", (0, exports._buildKey)(appName, account))).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc(data[0].fileID);
    });
};
exports.findPublishApp = findPublishApp;
// export let findAllPublishAppsByAccount = (
//     getDataByKeyContainFunc: any,
//     account: string): Stream<Array<publishAppInfo>> => {
//     return getDataByKeyContainFunc("publishedapps", [account]).flatMap((data: any) => {
//         if (data.length === 0) {
//             return just([])
//         }
//         return just(data.map(({ account, appName, description }) => {
//             return {
//                 account,
//                 appName,
//                 description
//             }
//         }))
//     })
// }
let findAllPublishApps = (getDataFunc, limitCount, skipCount) => {
    return (0, most_1.fromPromise)(getDataFunc("publishedapps", limitCount, skipCount)).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)([]);
        }
        return (0, most_1.just)(data.map(({ account, appName, description }) => {
            return {
                account,
                appName,
                description
            };
        }));
    });
};
exports.findAllPublishApps = findAllPublishApps;

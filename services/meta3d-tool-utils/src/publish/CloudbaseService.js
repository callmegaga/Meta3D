"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarketCollectionDataBodyForNodejs = exports.uploadFile = exports.updateMarketImplementData = exports.getFileID = exports.addMarketImplementDataToDataFromMarketImplementCollectionData = exports.buildMarketImplementAccountData = exports.getDataFromMarketImplementAccountData = exports.getDataFromMarketProtocolCollection = exports.getMarketImplementAccountData = exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = exports.addDataToMarketProtocolCollection = exports.isContain = exports.getMarketProtocolCollection = exports.hasAccount = exports.initProduction = exports.initLocal = void 0;
const node_sdk_1 = __importDefault(require("@cloudbase/node-sdk"));
const most_1 = require("most");
const BackendService = __importStar(require("meta3d-backend-cloudbase"));
let initLocal = () => {
    let app = node_sdk_1.default.init({
        secretId: "AKIDnQnwrXx6yZtwiDSQbVGkxtZ0C8nBI8i2",
        secretKey: "4rNcbJkvpSnrgFXYJn0wax3rPhiSu5zb",
        env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
    });
    return (0, most_1.just)(app);
};
exports.initLocal = initLocal;
let initProduction = () => {
    let app = node_sdk_1.default.init({
        secretId: "AKIDdL16e8c2KOWccglputqiU8cO5fMYlhcM",
        secretKey: "a1GJHNZntyxojls2Galt8FHSp5A1g8Ul",
        env: "meta3d-production-5eol5gce9a6b9c" // 此处填入您的环境ID
    });
    return (0, most_1.just)(app);
};
exports.initProduction = initProduction;
// let _getDatabase = (app: any) => {
// 	return app.database()
// }
exports.hasAccount = BackendService.hasAccount;
// export let notHasData = (app: any, collectionName: string, data: object) => {
// 	return fromPromise(_getDatabase(app).collection(collectionName)
// 		.where(data)
// 		.get()
// 		.then(res => res.data.length === 0))
// }
// export let uploadFile = (app: any, cloudPath: string, fileContent: Buffer) => {
// 	return fromPromise(app.uploadFile({
// 		cloudPath,
// 		fileContent
// 	}))
// }
exports.getMarketProtocolCollection = BackendService.getMarketProtocolCollection;
exports.isContain = BackendService.isContain;
// export let getMarketImplementAccountData = (app: any, collectionName: string, data: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.where(data)
// 		.get()
// }
// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.update(updateData)
// }
exports.addDataToMarketProtocolCollection = BackendService.addDataToMarketProtocolCollection;
exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = BackendService.addMarketProtocolDataToDataFromMarketProtocolCollectionData;
exports.getMarketImplementAccountData = BackendService.getMarketImplementAccountData;
exports.getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection;
exports.getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData;
exports.buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData;
exports.addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData;
exports.getFileID = BackendService.getFileID;
exports.updateMarketImplementData = BackendService.updateMarketImplementData;
exports.uploadFile = BackendService.uploadFile;
exports.parseMarketCollectionDataBodyForNodejs = BackendService.parseMarketCollectionDataBodyForNodejs;
//# sourceMappingURL=CloudbaseService.js.map
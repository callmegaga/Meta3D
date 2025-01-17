import fs from "fs"
// import path from "path"
import * as CloudbaseService from "meta3d-tool-utils/src/publish/CloudbaseService";
import * as _4everlandService from "meta3d-tool-utils/src/publish/4everlandService";
import { buildReadJsonFunc } from "meta3d-tool-utils/src/publish/PublishUtils"
import { env } from "meta3d-tool-utils/src/publish/PublishType"
import { publish, publishConfig } from "./Publish";

let _getFuncArr = (env: env, packageFilePath: string): [any, any, any, any, any, any, any, any, any, any, any, any] => {
	switch (env) {
		case "local":
			return [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				CloudbaseService.initLocal,
				CloudbaseService.hasAccount,
				CloudbaseService.getMarketProtocolCollection,
				CloudbaseService.isContain,
				CloudbaseService.addDataToMarketProtocolCollection,
				CloudbaseService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
				CloudbaseService.getDataFromMarketProtocolCollection,
				CloudbaseService.parseMarketCollectionDataBodyForNodejs
			]
		case "production":
			// return [
			// 	fs.readFileSync,
			// 	console.log,
			// 	console.error,
			// 	buildReadJsonFunc(packageFilePath),
			// 	_4everlandService.init,
			// 	_4everlandService.hasAccount,
			// 	_4everlandService.getMarketProtocolCollection,
			// 	_4everlandService.isContain,
			// 	_4everlandService.addDataToMarketProtocolCollection,
			// 	_4everlandService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
			// 	_4everlandService.getDataFromMarketProtocolCollection,
			// 	_4everlandService.parseMarketCollectionDataBodyForNodejs
			// ]

			return [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				CloudbaseService.initProduction,
				CloudbaseService.hasAccount,
				CloudbaseService.getMarketProtocolCollection,
				CloudbaseService.isContain,
				CloudbaseService.addDataToMarketProtocolCollection,
				CloudbaseService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
				CloudbaseService.getDataFromMarketProtocolCollection,
				CloudbaseService.parseMarketCollectionDataBodyForNodejs
			]
		default:
			throw new Error("unknown env")
	}
}

export function publishExtensionProtocol(
	env: env,
	packageFilePath: string, iconPath: string) {
	return publish(_getFuncArr(env, packageFilePath), packageFilePath, iconPath, "extension")
}

export function publishContributeProtocol(
	env: env,
	packageFilePath: string, iconPath: string) {
	return publish(_getFuncArr(env, packageFilePath), packageFilePath, iconPath, "contribute")
}

export function publishContributeProtocolConfig(env: env, packageFilePath: string, distFilePath: string) {
	return publishConfig(_getFuncArr(env, packageFilePath), packageFilePath, distFilePath, "contribute")
}

export function publishExtensionProtocolConfig(env: env, packageFilePath: string, distFilePath: string) {
	return publishConfig(_getFuncArr(env, packageFilePath), packageFilePath, distFilePath, "extension")
}


// // publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))

import { fromPromise } from "most"
import { handleKeyToLowercase } from "../../../../../utils/meta3d-backend-cloudbase/src/Main"

export let _buildKey = (
    entryExtensionProtocolName: string,
    entryExtensionProtocolVersion: string,
    packageName: string, packageVersion: string, account: string) => handleKeyToLowercase(account + "_" +
        entryExtensionProtocolName + "_" +
        entryExtensionProtocolVersion + "_" +
        packageName + "_" + packageVersion)


let _buildFileName = (
    packageName: string, packageVersion: string, account: string) => account + "_" +
    packageName + "_" + packageVersion


export let buildPartialKeyByEntryProcoltolData = (
    entryExtensionProtocolName: string,
    entryExtensionProtocolVersion: string,
) => entryExtensionProtocolName + "_" + entryExtensionProtocolVersion

export let buildPartialKeyByPackageData = _buildFileName

export let publish = (
    [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc]: [any, any, any, any, any, any],
    packageBinaryFile: ArrayBuffer,
    [
        entryExtensionProtocolName,
        entryExtensionProtocolVersion,
        entryExtensionProtocolVersionRange,
        entryExtensionProtocolIconBase64,
        entryExtensionProtocolDisplayName,
        entryExtensionProtocolRepoLink,
        entryExtensionProtocolDescription,
        entryExtensionName
    ]: [string, string, string, string, string, string, string, string],
    [packageName, packageVersion, description]: [string, string, string],
    account: string
) => {
    let key = _buildKey(
        entryExtensionProtocolName,
        entryExtensionProtocolVersion,
        packageName, packageVersion, account
    )

    return hasDataFunc("publishedpackages", key).concatMap((isExist) => {
        let fileName = _buildFileName
            (
                packageName, packageVersion, account
            )
        let filePath = "packages/" + fileName + ".arrayBuffer"

        return uploadFileFunc(onUploadProgressFunc, filePath, packageBinaryFile, fileName).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath)

            if (isExist) {
                return fromPromise(updateDataFunc(
                    "publishedpackages",
                    key,
                    {
                        account,
                        entryExtensionProtocolName,
                        entryExtensionProtocolVersion,
                        entryExtensionProtocolVersionRange,
                        entryExtensionProtocolIconBase64,
                        entryExtensionProtocolDisplayName,
                        entryExtensionProtocolRepoLink,
                        entryExtensionProtocolDescription,
                        entryExtensionName,
                        packageName,
                        packageVersion,
                        description,
                        fileID
                    }
                ))
            }

            return fromPromise(addDataFunc("publishedpackages",
                key,
                {
                    account,
                    entryExtensionProtocolName,
                    entryExtensionProtocolVersion,
                    entryExtensionProtocolVersionRange,
                    entryExtensionProtocolIconBase64,
                    entryExtensionProtocolDisplayName,
                    entryExtensionProtocolRepoLink,
                    entryExtensionProtocolDescription,
                    entryExtensionName,
                    packageName,
                    packageVersion,
                    description,
                    fileID
                }))
        })
    })
}

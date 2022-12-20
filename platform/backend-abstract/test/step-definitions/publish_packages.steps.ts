import { loadFeature, defineFeature } from "jest-cucumber"
import { empty, just, map } from "most";
import { createSandbox } from "sinon";
import { resolve } from "../../../../services/meta3d-tool-utils/src/publish/PromiseTool";
import { getFileID } from "meta3d-backend-cloudbase";
import { publish } from "../../src/application_layer/publish/PublishPackageService";
import { buildKey } from "../tool/PublishPackageTool"

const feature = loadFeature("./test/features/publish_package.feature")

defineFeature(feature, test => {
    let sandbox = null
    let onUploadProgressFunc, updateDataFunc, uploadFileFunc, hasDataFunc, addDataFunc, getFileIDFunc
    // let getDataByKeyFunc, downloadFileFunc
    // let getDataByKeyContainFunc

    function _createFuncsForPublish(sandbox) {
        onUploadProgressFunc = "onUploadProgressFunc"
        uploadFileFunc = sandbox.stub()
        hasDataFunc = sandbox.stub()
        addDataFunc = sandbox.stub().returns(
            resolve(null)
        )
        updateDataFunc = sandbox.stub().returns(
            resolve(null)
        )
        getFileIDFunc = getFileID
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('if not exist, publish should add package', ({ given, and, when, then }) => {
        let packageBinaryFile, packageName,
            packageVersion,
            entryProtocolName,
            entryProtocolVersion,
            entryProtocolIconBase64,
            entryExtensionName,
            account
        let fileID = "1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox)


            uploadFileFunc.returns(
                just({ fileID })
            )
            hasDataFunc.returns(
                just(false)
            )
        });

        and('generate a package', () => {
            packageBinaryFile = new ArrayBuffer(10)
            packageName = "package1"
            packageVersion = "0.0.1"
            entryProtocolName = "ep1"
            entryProtocolVersion = "0.0.2"
            entryProtocolIconBase64 = "epi1"
            entryExtensionName = "e1"
            account = "account1"
        });

        when('publish the package', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc],
                entryProtocolName,
                entryProtocolVersion,
                entryProtocolIconBase64,
                entryExtensionName,
                packageBinaryFile,
                packageName,
                packageVersion,
                account
            ).drain()
        });

        then('should upload package', () => {
            expect(uploadFileFunc).toCalledWith([
                onUploadProgressFunc,
                "packages/account1_package1_0.0.1.arrayBuffer",
                packageBinaryFile,
                "account1_package1_0.0.1"
            ])
        });

        and('add to collection', () => {
            expect(addDataFunc).toCalledWith([
                "publishedpackages",
                buildKey(entryProtocolName,
                    entryProtocolVersion,
                    packageName, packageVersion, account
                ),
                {
                    account,
                    entryProtocolName,
                    entryProtocolVersion,
                    entryProtocolIconBase64,
                    entryExtensionName,
                    packageName,
                    packageVersion,
                    fileID
                }
            ])
        });
    });

    test('if exist, publish should overwrite package', ({ given, and, when, then }) => {
        let fileID1 = "1"
        let fileID2 = "2"
        let packageBinaryFile1, packageName1,
            packageVersion1,
            entryProtocolName1,
            entryProtocolVersion1,
            entryProtocolIconBase641,
            entryExtensionName1,
            account1
        let packageBinaryFile2, packageName2,
            packageVersion2,
            entryProtocolName2,
            entryProtocolVersion2,
            entryProtocolIconBase642,
            entryExtensionName2,
            account2

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox)


            uploadFileFunc.onCall(0).returns(
                just({ fileID: fileID1 })
            )
            uploadFileFunc.onCall(1).returns(
                just({ fileID: fileID2 })
            )
            hasDataFunc.onCall(0).returns(
                just(false)
            )
            hasDataFunc.onCall(1).returns(
                just(true)
            )
        });

        and('generate two packages with the same key', () => {
            packageBinaryFile1 = new ArrayBuffer(10)
            packageName1 = "package1"
            packageVersion1 = "0.0.1"
            entryProtocolName1 = "ep1"
            entryProtocolVersion1 = "0.0.2"
            entryProtocolIconBase641 = "epi1"
            entryExtensionName1 = "e1"
            account1 = "account1"

            packageBinaryFile2 = new ArrayBuffer(11)
            packageName2 = packageName1
            packageVersion2 = packageVersion1
            entryProtocolName2 = entryProtocolName1
            entryProtocolVersion2 = entryProtocolVersion1
            entryProtocolIconBase642 = entryProtocolIconBase641
            entryExtensionName2 = entryExtensionName1
            account2 = account1
        });

        and('publish the first package', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc],
                entryProtocolName1,
                entryProtocolVersion1,
                entryProtocolIconBase641,
                entryExtensionName1,
                packageBinaryFile1,
                packageName1,
                packageVersion1,
                account1
            ).drain()
        });

        when('publish the second package', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc],
                entryProtocolName2,
                entryProtocolVersion2,
                entryProtocolIconBase642,
                entryExtensionName2,
                packageBinaryFile2,
                packageName2,
                packageVersion2,
                account2
            ).drain()

        });

        then(/^should upload package(\d+)'s binary file$/, () => {
            expect(uploadFileFunc.getCall(1)).toCalledWith([
                onUploadProgressFunc,
                "packages/account1_package1_0.0.1.arrayBuffer",
                packageBinaryFile2,
                "account1_package1_0.0.1"
            ])
        });

        and('update collection', () => {
            expect(addDataFunc).toCalledOnce()

            expect(updateDataFunc).toCalledOnce()
            expect(updateDataFunc).toCalledWith([
                "publishedpackages",
                buildKey(entryProtocolName1,
                    entryProtocolVersion1,
                    packageName1, packageVersion1, account1
                ),
                {
                    account: account1,
                    entryProtocolName: entryProtocolName2,
                    entryProtocolVersion: entryProtocolVersion2,
                    entryProtocolIconBase64: entryProtocolIconBase642,
                    entryExtensionName: entryExtensionName1,
                    packageName: packageName2,
                    packageVersion: packageVersion2,
                    fileID: fileID2
                }
            ])
        });
    });
})
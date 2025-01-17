import { empty, from, fromPromise, just, mergeArray, Stream } from "most"
import { satisfies } from "semver";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { getExn, isNullable } from "../../utils/NullableUtils";
import { implementInfos, protocols } from "./MarketType";

export let getAllPublishProtocolData = (
    [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc]: [any, any],
    collectionName: string, limitCount: number, skipCount: number): Stream<protocols> => {
    return fromPromise(getMarketProtocolCollectionFunc(collectionName, limitCount, skipCount)).map((res: any) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res)

        return resData.map(({ name, version, account, iconBase64, displayName, repoLink, description }) => {
            return { name, version, account, iconBase64, displayName, repoLink, description }
        })
    })
}

export let getAllPublishProtocolDataCount = (
    getMarketProtocolCollectionCount: any,
    collectionName: string): Stream<protocols> => {
    return fromPromise(getMarketProtocolCollectionCount(collectionName))
}

export let getAllPublishProtocolConfigData = (
    [getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc]: [any, any],
    collectionName: string,
    limitCount: number,
    skipCount: number
) => {
    return fromPromise(getMarketProtocolCollectionFunc(collectionName, limitCount, skipCount)).map((res: any) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res)

        return resData.map(({ name, version, account, configStr }) => {
            return { name, version, account, configStr }
        })
    })
}

export let getAllPublishImplementInfo = (
    [
        getMarketImplementCollectionFunc,
        mapMarketImplementCollectionFunc,
        getAccountFromMarketImplementCollectionDataFunc,
        getFileDataFromMarketImplementCollectionDataFunc,
    ]: [any, any, any, any],
    collectionName: string,
    limitCount: number,
    skipCount: number,
    protocolName: string, protocolVersion: string): Stream<implementInfos> => {
    return fromPromise(getMarketImplementCollectionFunc(collectionName, limitCount, skipCount)).flatMap((res: any) => {
        // console.log(JSON.stringify( res.data))
        return fromPromise(mergeArray(
            mapMarketImplementCollectionFunc(res, (marketImplementCollectionData) => {
                let account = getAccountFromMarketImplementCollectionDataFunc(marketImplementCollectionData)
                let fileData = getFileDataFromMarketImplementCollectionDataFunc(marketImplementCollectionData)

                let result = fileData.filter(data => {
                    return data.protocolName === protocolName &&
                        satisfies(
                            protocolVersion,
                            data.protocolVersion
                        )
                })

                if (result.length === 0) {
                    return empty()
                }

                return from(result.map(({ fileID, name, version,
                    displayName, repoLink, description
                }) => {
                    return {
                        id: fileID, name, version, account,
                        displayName, repoLink, description
                    }
                }))
            })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        )
        )
    })
}

export let findPublishImplement = ([getMarketImplementFunc, downloadFileFunc]: [any, any],
    collectionName: string,
    limitCount: number,
    skipCount: number,
    account: string,
    name: string,
    version: string
) => {
    return fromPromise(getMarketImplementFunc(collectionName,
        limitCount, skipCount,
        account, name, version)).flatMap((data: nullable<any>) => {
            if (isNullable(data)) {
                return just(null)
            }

            return downloadFileFunc(getExn(data).fileID)
        })
}

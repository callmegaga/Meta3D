

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_array from "../../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Caml_array from "../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Log$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as Result$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as TreeNode$Meta3dEngineCore from "./TreeNode.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as IterateTree$Meta3dEngineCore from "./IterateTree.bs.js";
import * as OperateTree$Meta3dEngineCore from "./OperateTree.bs.js";
import * as StateContainer$Meta3dEngineCore from "../../state/StateContainer.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _findGroup(groupName, groups) {
  if (ArraySt$Meta3dCommonlib.length(ArraySt$Meta3dCommonlib.filter(groups, (function (param) {
                return param.name === groupName;
              }))) > 1) {
    Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr("groupName:" + groupName + " has more than one in groups"));
  }
  var group = ListSt$Meta3dCommonlib.getBy(ListSt$Meta3dCommonlib.fromArray(groups), (function (param) {
          return param.name === groupName;
        }));
  if (group !== undefined) {
    return group;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr("groupName:" + groupName + " not in groups"));
  }
}

function _getStates(api, meta3dEngineCoreExtensionProtocolName, meta3dState) {
  return api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName).states;
}

function _setStates(api, meta3dEngineCoreExtensionProtocolName, meta3dState, states) {
  var init = api.getExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName);
  return api.setExtensionState(meta3dState, meta3dEngineCoreExtensionProtocolName, {
              allRegisteredPipelineContribute: init.allRegisteredPipelineContribute,
              states: states,
              contributeData: init.contributeData,
              componentContributeData: init.componentContributeData,
              gameObjectContribute: init.gameObjectContribute,
              usedGameObjectContribute: init.usedGameObjectContribute
            });
}

function _buildJobStream(param, param$1, is_set_state, execFunc) {
  var meta3dEngineCoreExtensionProtocolName = param$1[3];
  var setMeta3dState = param$1[2];
  var unsafeGetMeta3dState = param$1[1];
  var api = param$1[0];
  var __x = Curry._1(param.just, execFunc);
  var __x$1 = Curry._2(param.flatMap, (function (func) {
          return Curry._2(func, Curry._1(unsafeGetMeta3dState, undefined), {
                      api: api,
                      getStatesFunc: (function (param) {
                          return _getStates(api, meta3dEngineCoreExtensionProtocolName, param);
                        }),
                      setStatesFunc: (function (param, param$1) {
                          return _setStates(api, meta3dEngineCoreExtensionProtocolName, param, param$1);
                        }),
                      meta3dEngineCoreExtensionProtocolName: meta3dEngineCoreExtensionProtocolName
                    });
        }), __x);
  return Curry._2(param.map, (function (meta3dState) {
                if (NullableSt$Meta3dCommonlib.getWithDefault(is_set_state, true)) {
                  return Curry._1(setMeta3dState, meta3dState);
                }
                
              }), __x$1);
}

function _getExecFunc(_getExecFuncs, pipelineName, jobName) {
  while(true) {
    var getExecFuncs = _getExecFuncs;
    if (ListSt$Meta3dCommonlib.length(getExecFuncs) === 0) {
      return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("_getExecFunc", "can't get execFunc with pipelineName:" + pipelineName + ", jobName:" + jobName + "", "", "", "")));
    }
    if (getExecFuncs) {
      var result = Curry._2(getExecFuncs.hd, pipelineName, jobName);
      if (!(result == null)) {
        return OptionSt$Meta3dCommonlib.getExn(OptionSt$Meta3dCommonlib.fromNullable(result));
      }
      _getExecFuncs = getExecFuncs.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "PipelineManager.res",
            131,
            14
          ],
          Error: new Error()
        };
  };
}

function _buildJobStreams(data, param, param$1, groups) {
  var pipelineName = param$1[0];
  var getExecFuncs = param[1];
  var buildPipelineStreamFunc = param[0];
  var meta3dEngineCoreExtensionProtocolName = data[4];
  var setMeta3dState = data[3];
  var unsafeGetMeta3dState = data[2];
  var mostService = data[1];
  var api = data[0];
  return ListSt$Meta3dCommonlib.reduce(ListSt$Meta3dCommonlib.fromArray(param$1[1]), /* [] */0, (function (streams, param) {
                var name = param.name;
                if (param.type_ === "group") {
                  var group = _findGroup(name, groups);
                  var stream = Curry._5(buildPipelineStreamFunc, data, getExecFuncs, pipelineName, group, groups);
                  return ListSt$Meta3dCommonlib.push(streams, stream);
                }
                var execFunc = _getExecFunc(getExecFuncs, pipelineName, name);
                return ListSt$Meta3dCommonlib.push(streams, _buildJobStream(mostService, [
                                api,
                                unsafeGetMeta3dState,
                                setMeta3dState,
                                meta3dEngineCoreExtensionProtocolName
                              ], param.is_set_state, execFunc));
              }));
}

function _buildPipelineStream(data, getExecFuncs, pipelineName, param, groups) {
  var mostService = data[1];
  var streams = _buildJobStreams(data, [
        _buildPipelineStream,
        getExecFuncs
      ], [
        pipelineName,
        param.elements
      ], groups);
  return Curry._1(param.link === "merge" ? mostService.mergeArray : mostService.concatArray, ListSt$Meta3dCommonlib.toArray(streams));
}

function parse(meta3dState, data, getExecFuncs, param) {
  var groups = param.groups;
  var unsafeGetMeta3dState = data[2];
  var group = _findGroup(param.first_group, groups);
  Curry._1(data[3], meta3dState);
  var __x = _buildPipelineStream(data, getExecFuncs, param.name, group, groups);
  return Curry._2(data[1].map, (function (param) {
                return Curry._1(unsafeGetMeta3dState, undefined);
              }), __x);
}

var ParsePipelineData = {
  _findGroup: _findGroup,
  _getStates: _getStates,
  _setStates: _setStates,
  _buildJobStream: _buildJobStream,
  _getExecFunc: _getExecFunc,
  _buildJobStreams: _buildJobStreams,
  _buildPipelineStream: _buildPipelineStream,
  parse: parse
};

function registerPipeline(state, contribute, config, jobOrders) {
  return {
          allRegisteredPipelineContribute: ListSt$Meta3dCommonlib.push(state.allRegisteredPipelineContribute, [
                contribute,
                config,
                jobOrders
              ]),
          states: state.states,
          contributeData: state.contributeData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function unregisterPipeline(state, targetPipelineName) {
  return {
          allRegisteredPipelineContribute: ListSt$Meta3dCommonlib.filter(state.allRegisteredPipelineContribute, (function (param) {
                  return param[0].pipelineName !== targetPipelineName;
                })),
          states: state.states,
          contributeData: state.contributeData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function init(state, meta3dState) {
  var allRegisteredPipelineContribute = state.allRegisteredPipelineContribute;
  return ListSt$Meta3dCommonlib.reduce(allRegisteredPipelineContribute, {
              allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
              states: ListSt$Meta3dCommonlib.reduce(allRegisteredPipelineContribute, ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), (function (states, param) {
                      var match = param[0];
                      return ImmutableHashMap$Meta3dCommonlib.set(states, match.pipelineName, Curry._2(match.createStateFunc, meta3dState, param[1]));
                    })),
              contributeData: state.contributeData,
              componentContributeData: state.componentContributeData,
              gameObjectContribute: state.gameObjectContribute,
              usedGameObjectContribute: state.usedGameObjectContribute
            }, (function (state, param) {
                var match = param[0];
                StateContainer$Meta3dEngineCore.setState(state);
                Curry._1(match.initFunc, OptionSt$Meta3dCommonlib.unsafeGet(ImmutableHashMap$Meta3dCommonlib.get(state.states, match.pipelineName)));
                return StateContainer$Meta3dEngineCore.unsafeGetState(undefined);
              }));
}

function _findInsertPipelineName(insertElementName, allRegisteredPipelineContribute) {
  return OptionSt$Meta3dCommonlib.get(OptionSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.find(allRegisteredPipelineContribute, (function (param) {
                        var match = Caml_array.get(param[0].allPipelineData, 0);
                        return ArraySt$Meta3dCommonlib.includesByFunc(match.groups, (function (param) {
                                      return ArraySt$Meta3dCommonlib.includesByFunc(param.elements, (function (param) {
                                                    return param.name === insertElementName;
                                                  }));
                                    }));
                      })), (function (param) {
                    return param[0].pipelineName;
                  })));
}

function _check(registeredPipelineContribute) {
  if (ArraySt$Meta3dCommonlib.length(registeredPipelineContribute[0].allPipelineData) <= 1 && ArraySt$Meta3dCommonlib.length(registeredPipelineContribute[2]) <= 1) {
    return Result$Meta3dCommonlib.succeed(registeredPipelineContribute);
  } else {
    return Result$Meta3dCommonlib.failWith(Log$Meta3dCommonlib.buildErrorMessage("allPipelineData or jobOrders should has the same pipeline <= 1", "", "", "", ""));
  }
}

function _findAllSpecificPipelineRelatedData(allRegisteredPipelineContribute, targetPipelineName) {
  return Result$Meta3dCommonlib.bind(Result$Meta3dCommonlib.mapSuccess(ListSt$Meta3dCommonlib.traverseResultM(allRegisteredPipelineContribute, (function (param) {
                        var pipelineContribute = param[0];
                        return _check([
                                    {
                                      pipelineName: pipelineContribute.pipelineName,
                                      createStateFunc: pipelineContribute.createStateFunc,
                                      initFunc: pipelineContribute.initFunc,
                                      getExecFunc: pipelineContribute.getExecFunc,
                                      allPipelineData: ArraySt$Meta3dCommonlib.filter(pipelineContribute.allPipelineData, (function (param) {
                                              return param.name === targetPipelineName;
                                            }))
                                    },
                                    param[1],
                                    ArraySt$Meta3dCommonlib.filter(param[2], (function (param) {
                                            return param.pipelineName === targetPipelineName;
                                          }))
                                  ]);
                      })), (function (allRegisteredPipelineContribute) {
                    return ListSt$Meta3dCommonlib.filter(allRegisteredPipelineContribute, (function (param) {
                                  return ArraySt$Meta3dCommonlib.length(param[0].allPipelineData) === 1;
                                }));
                  })), (function (allRegisteredPipelineContribute) {
                return ListSt$Meta3dCommonlib.traverseResultM(ListSt$Meta3dCommonlib.map(allRegisteredPipelineContribute, (function (param) {
                                  var registeredPipelineContribute = param[0];
                                  return [
                                          registeredPipelineContribute.pipelineName,
                                          registeredPipelineContribute.getExecFunc,
                                          Caml_array.get(registeredPipelineContribute.allPipelineData, 0),
                                          ArraySt$Meta3dCommonlib.getFirst(param[2])
                                        ];
                                })), (function (param) {
                              var pipelineData = param[2];
                              var getExecFunc = param[1];
                              var pipelineName = param[0];
                              return Result$Meta3dCommonlib.mapSuccess(OptionSt$Meta3dCommonlib.sequenceResultM(OptionSt$Meta3dCommonlib.map(param[3], (function (param) {
                                                    var insertAction = param.insertAction;
                                                    var insertElementName = param.insertElementName;
                                                    return Result$Meta3dCommonlib.mapSuccess(_findInsertPipelineName(insertElementName, allRegisteredPipelineContribute), (function (insertPipelineName) {
                                                                  return {
                                                                          insertPipelineName: insertPipelineName,
                                                                          insertElementName: insertElementName,
                                                                          insertAction: insertAction
                                                                        };
                                                                }));
                                                  }))), (function (jobOrderOpt) {
                                            return {
                                                    pipelineName: pipelineName,
                                                    getExecFunc: getExecFunc,
                                                    pipelineData: pipelineData,
                                                    jobOrder: jobOrderOpt
                                                  };
                                          }));
                            }));
              }));
}

function _handleInsertedAsRootNode(treeDataList, param) {
  var nodeInsertPipelineNameOpt = param[4];
  var nodeJobOrderOpt = param[3];
  var pipelineData = param[2];
  var getExecFunc = param[1];
  var pipelineName = param[0];
  return ListSt$Meta3dCommonlib.reduce(treeDataList, [
              /* [] */0,
              undefined
            ], (function (param, treeData) {
                var insertPipelineNameOpt = treeData[1];
                var insertedTreeOpt = param[1];
                var newTreeDataList = param[0];
                if (insertPipelineNameOpt === undefined) {
                  return [
                          ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, treeData),
                          insertedTreeOpt
                        ];
                }
                if (insertPipelineNameOpt !== pipelineName) {
                  return [
                          ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, treeData),
                          insertedTreeOpt
                        ];
                }
                var insertedTree = TreeNode$Meta3dEngineCore.buildNode(pipelineName, [
                      getExecFunc,
                      pipelineData,
                      nodeJobOrderOpt
                    ], treeData[0]);
                return [
                        ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, [
                              {
                                hd: insertedTree,
                                tl: /* [] */0
                              },
                              nodeInsertPipelineNameOpt
                            ]),
                        insertedTree
                      ];
              }));
}

function _add(treeDataList, node, insertPipelineNameOpt) {
  return {
          hd: [
            {
              hd: node,
              tl: /* [] */0
            },
            insertPipelineNameOpt
          ],
          tl: treeDataList
        };
}

function _insertToAsChildNodeOrSameLevelTree(treeDataList, nodeInsertPipelineName, node) {
  return ListSt$Meta3dCommonlib.reduce(treeDataList, [
              /* [] */0,
              false
            ], (function (param, param$1) {
                var insertPipelineNameOpt = param$1[1];
                var sameLevelTreeList = param$1[0];
                var isInsertTo = param[1];
                var newTreeDataList = param[0];
                var match;
                var exit = 0;
                if (insertPipelineNameOpt !== undefined && insertPipelineNameOpt === nodeInsertPipelineName) {
                  match = [
                    ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, [
                          ListSt$Meta3dCommonlib.push(sameLevelTreeList, node),
                          insertPipelineNameOpt
                        ]),
                    true
                  ];
                } else {
                  exit = 1;
                }
                if (exit === 1) {
                  var match$1 = ListSt$Meta3dCommonlib.reduce(sameLevelTreeList, [
                        /* [] */0,
                        false
                      ], (function (param, tree) {
                          var isInsertTo = param[1];
                          var match = OperateTree$Meta3dEngineCore.insertNode(tree, nodeInsertPipelineName, node);
                          return [
                                  ListSt$Meta3dCommonlib.addInReduce(param[0], match[0]),
                                  isInsertTo ? isInsertTo : match[1]
                                ];
                        }));
                  match = [
                    ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, [
                          match$1[0],
                          insertPipelineNameOpt
                        ]),
                    match$1[1]
                  ];
                }
                return [
                        match[0],
                        isInsertTo ? isInsertTo : match[1]
                      ];
              }));
}

function _removeInsertedTree(treeDataList, insertedTree) {
  return ListSt$Meta3dCommonlib.filter(ListSt$Meta3dCommonlib.map(treeDataList, (function (param) {
                    return [
                            ListSt$Meta3dCommonlib.filter(param[0], (function (sameLevelTree) {
                                    return !TreeNode$Meta3dEngineCore.isEqual(sameLevelTree, insertedTree);
                                  })),
                            param[1]
                          ];
                  })), (function (param) {
                return ListSt$Meta3dCommonlib.length(param[0]) > 0;
              }));
}

function _getTree(treeDataList) {
  if (ListSt$Meta3dCommonlib.length(treeDataList) !== 1) {
    return Result$Meta3dCommonlib.failWith(Log$Meta3dCommonlib.buildErrorMessage("treeDataList.length should be 1", "", "", "", ""));
  } else {
    return Result$Meta3dCommonlib.bind(OptionSt$Meta3dCommonlib.get(ListSt$Meta3dCommonlib.head(treeDataList)), (function (param) {
                  var sameLevelTreeList = param[0];
                  if (ListSt$Meta3dCommonlib.length(sameLevelTreeList) !== 1) {
                    return Result$Meta3dCommonlib.failWith(Log$Meta3dCommonlib.buildErrorMessage("sameLevelTreeList.length should be 1", "", "", "", ""));
                  } else {
                    return OptionSt$Meta3dCommonlib.get(ListSt$Meta3dCommonlib.head(sameLevelTreeList));
                  }
                }));
  }
}

function _buildTree(allSpecificPipelineRelatedData) {
  return _getTree(ListSt$Meta3dCommonlib.reduce(allSpecificPipelineRelatedData, /* [] */0, (function (treeDataList, param) {
                    var jobOrder = param.jobOrder;
                    var pipelineData = param.pipelineData;
                    var getExecFunc = param.getExecFunc;
                    var pipelineName = param.pipelineName;
                    if (jobOrder !== undefined) {
                      var insertPipelineName = jobOrder.insertPipelineName;
                      var nodeJobOrderOpt = {
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction
                      };
                      var match = _handleInsertedAsRootNode(treeDataList, [
                            pipelineName,
                            getExecFunc,
                            pipelineData,
                            nodeJobOrderOpt,
                            insertPipelineName
                          ]);
                      var insertedTreeOpt = match[1];
                      var treeDataList$1 = match[0];
                      if (insertedTreeOpt !== undefined) {
                        var match$1 = _insertToAsChildNodeOrSameLevelTree(treeDataList$1, insertPipelineName, insertedTreeOpt);
                        var treeDataList$2 = match$1[0];
                        if (match$1[1]) {
                          return _removeInsertedTree(treeDataList$2, insertedTreeOpt);
                        } else {
                          return treeDataList$2;
                        }
                      }
                      var node = TreeNode$Meta3dEngineCore.buildNode(pipelineName, [
                            getExecFunc,
                            pipelineData,
                            nodeJobOrderOpt
                          ], /* [] */0);
                      var match$2 = _insertToAsChildNodeOrSameLevelTree(treeDataList$1, insertPipelineName, node);
                      var treeDataList$3 = match$2[0];
                      if (match$2[1]) {
                        return treeDataList$3;
                      } else {
                        return _add(treeDataList$3, node, insertPipelineName);
                      }
                    }
                    var match$3 = _handleInsertedAsRootNode(treeDataList, [
                          pipelineName,
                          getExecFunc,
                          pipelineData,
                          undefined,
                          undefined
                        ]);
                    var treeDataList$4 = match$3[0];
                    if (OptionSt$Meta3dCommonlib.isSome(match$3[1])) {
                      return treeDataList$4;
                    } else {
                      return _add(treeDataList$4, TreeNode$Meta3dEngineCore.buildNode(pipelineName, [
                                      getExecFunc,
                                      pipelineData,
                                      undefined
                                    ], /* [] */0), undefined);
                    }
                  })));
}

function _buildFirstGroupElement(groups, first_group) {
  return OptionSt$Meta3dCommonlib.get(OptionSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.find(groups, (function (param) {
                        return param.name === first_group;
                      })), (function (param) {
                    return {
                            name: param.name,
                            type_: "group",
                            is_set_state: false
                          };
                  })));
}

function _insertElement(groups, insertAction, insertElementName, insertElement) {
  return ArraySt$Meta3dCommonlib.map(groups, (function (group) {
                return {
                        name: group.name,
                        link: group.link,
                        elements: ArraySt$Meta3dCommonlib.reduceOneParam(group.elements, (function (result, element) {
                                if (element.name === insertElementName) {
                                  if (insertAction) {
                                    return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, element), insertElement);
                                  } else {
                                    return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, insertElement), element);
                                  }
                                } else {
                                  return ArraySt$Meta3dCommonlib.push(result, element);
                                }
                              }), [])
                      };
              }));
}

var _mergeGroups = Js_array.concat;

var _mergeGetElementFuncs = ListSt$Meta3dCommonlib.concat;

function _mergeToRootNode(tree) {
  return Result$Meta3dCommonlib.mapSuccess(IterateTree$Meta3dEngineCore.postOrderCataWithParentNode((function (parentNodeOpt, pipelineName, nodeData) {
                    var getExecFuncs = nodeData.getExecFuncs;
                    var pipelineData = nodeData.pipelineData;
                    var jobOrder = nodeData.jobOrder;
                    return function (children) {
                      var node = TreeNode$Meta3dEngineCore.buildNodeByNodeData(pipelineName, nodeData, children);
                      if (parentNodeOpt === undefined) {
                        return Result$Meta3dCommonlib.succeed(node);
                      }
                      var parentNodeData = TreeNode$Meta3dEngineCore.getNodeData(parentNodeOpt);
                      return Result$Meta3dCommonlib.bind(OptionSt$Meta3dCommonlib.get(jobOrder), (function (param) {
                                    var insertAction = param.insertAction;
                                    var insertElementName = param.insertElementName;
                                    return Result$Meta3dCommonlib.mapSuccess(_buildFirstGroupElement(pipelineData.groups, pipelineData.first_group), (function (insertElement) {
                                                  var init = parentNodeData.pipelineData;
                                                  parentNodeData.pipelineData = {
                                                    name: init.name,
                                                    groups: Js_array.concat(_insertElement(parentNodeData.pipelineData.groups, insertAction, insertElementName, insertElement), pipelineData.groups),
                                                    first_group: init.first_group
                                                  };
                                                  parentNodeData.getExecFuncs = ListSt$Meta3dCommonlib.concat(parentNodeData.getExecFuncs, getExecFuncs);
                                                  return node;
                                                }));
                                  }));
                    };
                  }), tree, undefined, undefined), (function (tree) {
                var match = TreeNode$Meta3dEngineCore.getNodeData(tree);
                var getExecFuncs = match.getExecFuncs;
                var pipelineData = match.pipelineData;
                return [
                        getExecFuncs,
                        pipelineData
                      ];
              }));
}

function merge(allRegisteredPipelineContribute, pipelineName) {
  return Result$Meta3dCommonlib.bind(Result$Meta3dCommonlib.bind(_findAllSpecificPipelineRelatedData(allRegisteredPipelineContribute, pipelineName), _buildTree), _mergeToRootNode);
}

var MergePipelineData = {
  _findInsertPipelineName: _findInsertPipelineName,
  _check: _check,
  _findAllSpecificPipelineRelatedData: _findAllSpecificPipelineRelatedData,
  _handleInsertedAsRootNode: _handleInsertedAsRootNode,
  _isInserted: OptionSt$Meta3dCommonlib.isSome,
  _add: _add,
  _insertToAsChildNodeOrSameLevelTree: _insertToAsChildNodeOrSameLevelTree,
  _removeInsertedTree: _removeInsertedTree,
  _getTree: _getTree,
  _buildTree: _buildTree,
  _buildFirstGroupElement: _buildFirstGroupElement,
  _insertElement: _insertElement,
  _mergeGroups: _mergeGroups,
  _mergeGetElementFuncs: _mergeGetElementFuncs,
  _mergeToRootNode: _mergeToRootNode,
  merge: merge
};

function runPipeline(meta3dState, data, pipelineName) {
  var match = data[0].getExtensionState(meta3dState, data[4]);
  return Result$Meta3dCommonlib.mapSuccess(merge(match.allRegisteredPipelineContribute, pipelineName), (function (param) {
                return parse(meta3dState, data, param[0], param[1]);
              }));
}

export {
  ParsePipelineData ,
  registerPipeline ,
  unregisterPipeline ,
  init ,
  MergePipelineData ,
  runPipeline ,
}
/* No side effect */

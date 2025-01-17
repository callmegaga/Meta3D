

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "sinon";
import * as Caml_array from "../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as ReducerTool$Meta3dUi from "../tool/ReducerTool.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as NumberTool$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/test/bdd/NumberTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";

var feature = JestCucumber.loadFeature("./test/features/dispatch.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var state = {
          contents: 1
        };
        var _prepare = function (given, and) {
          Curry._2(given, "prepare sandbox", (function (param) {
                  sandbox.contents = Sinon.sandbox.create();
                }));
          return Curry._2(and, "create state", (function (param) {
                        state.contents = MainTool$Meta3dUi.createState(undefined);
                      }));
        };
        test("if element state change, update data", (function (param) {
                var and = param.and;
                var given = param.given;
                var elementName1 = "e1";
                var elementState1 = {
                  contents: 1
                };
                _prepare(given, and);
                Curry._2(given, "register element1 with reducer1 and elementState1 whose data1 = 1", (function (param) {
                        elementState1.contents = {
                          data1: 1
                        };
                        state.contents = MainTool$Meta3dUi.registerElement(state.contents, 1, elementName1, undefined, Caml_option.some(elementState1.contents), Caml_option.some(NullableSt$Meta3dCommonlib.$$return(ReducerTool$Meta3dUi.buildReducers("role1", [{
                                            actionName: "action1",
                                            updatedElementStateFieldName: "data1"
                                          }], undefined))), undefined);
                      }));
                Curry._2(param.when, /^dispatch action to set data(\d+) to (\d+)$/, (function (param) {
                        NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        state.contents = MainTool$Meta3dUi.dispatch(state.contents, "action1", "role1", (function (v) {
                                return 10;
                              }));
                      }));
                Curry._2(param.then, "mark state change", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.isStateChange(state.contents, elementName1)), true);
                      }));
                Curry._2(and, /^data(\d+) should be (\d+)$/, (function (param) {
                        var $$arguments = NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getElementState(state.contents, elementName1).data1), Caml_array.get($$arguments, 1));
                      }));
              }));
        test("else, not update data", (function (param) {
                var and = param.and;
                var given = param.given;
                var elementName1 = "e1";
                var elementState1 = {
                  contents: 1
                };
                _prepare(given, and);
                Curry._2(given, "register element1 with reducer1 and elementState1 whose data1 = 10", (function (param) {
                        elementState1.contents = {
                          data1: 10
                        };
                        state.contents = MainTool$Meta3dUi.registerElement(state.contents, 1, elementName1, undefined, Caml_option.some(elementState1.contents), Caml_option.some(NullableSt$Meta3dCommonlib.$$return(ReducerTool$Meta3dUi.buildReducers("role1", [{
                                            actionName: "action1",
                                            updatedElementStateFieldName: "data1"
                                          }], undefined))), undefined);
                      }));
                Curry._2(param.when, /^dispatch action to set data(\d+) to (\d+)$/, (function (param) {
                        NumberTool$Meta3dCommonlib.getExnAndConvertArgumentsToNumber(Caml_option.undefined_to_opt(typeof arguments === "undefined" ? undefined : arguments));
                        state.contents = MainTool$Meta3dUi.dispatch(state.contents, "action1", "role1", (function (v) {
                                return 10;
                              }));
                      }));
                Curry._2(param.then, "mark state not change", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.isStateChange(state.contents, elementName1)), false);
                      }));
                Curry._2(and, "data1 should not change", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getElementState(state.contents, elementName1).data1), 10);
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */

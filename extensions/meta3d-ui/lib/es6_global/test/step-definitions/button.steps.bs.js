

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as SinonTool$Meta3dUi from "../tool/SinonTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImguiRendererServiceTool$Meta3dUi from "../tool/ImguiRendererServiceTool.bs.js";

var feature = JestCucumber.loadFeature("./test/features/button.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        return test("invoke imgui renderer's button", (function (param) {
                      var and = param.and;
                      var given = param.given;
                      var newMeta3dState = {
                        contents: 12
                      };
                      var isClick = {
                        contents: 1
                      };
                      var imguiRendererExtensionName = "imguiRendererExtensionName";
                      var label = {
                        contents: 1
                      };
                      var size = {
                        contents: 1
                      };
                      var imguiRendererService = {
                        contents: 1
                      };
                      var buttonStub = {
                        contents: 1
                      };
                      var getExtensionServiceStub = {
                        contents: 1
                      };
                      var getExtensionStateStub = {
                        contents: 1
                      };
                      var setExtensionStateStub = {
                        contents: 1
                      };
                      Curry._2(given, "prepare sandbox", (function (param) {
                              sandbox.contents = Sinon$1.sandbox.create();
                              
                            }));
                      Curry._2(and, "prepare imgui renderer service", (function (param) {
                              var __x = Sinon.createEmptyStub(sandbox.contents);
                              buttonStub.contents = Sinon.returns([
                                    13,
                                    true
                                  ], __x);
                              imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, buttonStub.contents, undefined, undefined);
                              
                            }));
                      Curry._2(and, "prepare api", (function (param) {
                              var __x = Sinon.createEmptyStub(sandbox.contents);
                              getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                              getExtensionStateStub.contents = Sinon.returns(12, Sinon.createEmptyStub(sandbox.contents));
                              setExtensionStateStub.contents = Sinon.returns(23, Sinon.createEmptyStub(sandbox.contents));
                              
                            }));
                      Curry._2(given, "prepare data", (function (param) {
                              label.contents = "Window";
                              size.contents = [
                                1,
                                2
                              ];
                              
                            }));
                      Curry._2(param.when, "button", (function (param) {
                              var match = MainTool$Meta3dUi.button(sandbox, label.contents, size.contents, getExtensionServiceStub.contents, undefined, Caml_option.some(getExtensionStateStub.contents), Caml_option.some(setExtensionStateStub.contents), imguiRendererExtensionName, 22, undefined);
                              isClick.contents = match[1];
                              newMeta3dState.contents = match[0];
                              
                            }));
                      Curry._2(param.then, "invoke imgui renderer's button", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionName, getExtensionStateStub.contents)),
                                              Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionName, getExtensionServiceStub.contents)),
                                              SinonTool$Meta3dUi.calledWithArg3(Sinon.getCall(0, buttonStub.contents), label.contents, size.contents, 12)
                                            ]), [
                                          1,
                                          1,
                                          true
                                        ]);
                            }));
                      Curry._2(and, "update imgui renderer state", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              SinonTool$Meta3dUi.calledWithArg3(Sinon.getCall(0, setExtensionStateStub.contents), 22, imguiRendererExtensionName, 13),
                                              newMeta3dState.contents
                                            ]), [
                                          true,
                                          23
                                        ]);
                            }));
                      return Curry._2(and, "return isClick", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(isClick.contents), true);
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */


import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as BufferDirectionLightUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/BufferDirectionLightUtils.bs.js";

function setColor(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorIndex(index), data, typeArr);
}

function setIntensity(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensityIndex(index), data, typeArr);
}

export {
  setColor ,
  setIntensity ,
}
/* No side effect */

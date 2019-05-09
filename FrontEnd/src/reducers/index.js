import { combineReducers } from "redux"

import userInformation from "./userInformation"
import trainerInformation from "./trainerInformation"
import programInformation from "./programInformation"

const rootReducer = combineReducers({
  userInformation,
  trainerInformation,
  programInformation
})

export default rootReducer
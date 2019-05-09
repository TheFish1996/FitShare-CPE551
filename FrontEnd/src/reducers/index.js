import { combineReducers } from "redux"

import userInformation from "./userInformation"
import trainerInformation from "./trainerInformation"

const rootReducer = combineReducers({
  userInformation,
  trainerInformation
})

export default rootReducer
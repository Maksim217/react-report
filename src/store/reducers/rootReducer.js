import {combineReducers} from 'redux'
import reportReducer from './report'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'

export default combineReducers({
  report: reportReducer,
  auth:   authReducer,
  form:   formReducer
})
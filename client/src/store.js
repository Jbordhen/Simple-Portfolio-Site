import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  addEducationReducer,
  addExperienceReducer,
  addProjectReducer,
  addReferenceReducer,
  addSkillReducer,
  getEducationReducer,
  getExperienceReducer,
  getProjectReducer,
  getReferenceReducer,
  getSkillReducer,
  updateEducationReducer,
  updateExperienceReducer,
  updateProjectReducer,
  updateReferenceReducer,
  updateSkillReducer,
  userListReducer,
  userLoginReducer,
  userProfileUpdateReducer,
  userRegisterReducer
} from './reducers/userReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileUpdateReducer,
  userAddEducation: addEducationReducer,
  userAddSkill: addSkillReducer,
  userAddProject: addProjectReducer,
  userAddExperience: addExperienceReducer,
  userAddReference: addReferenceReducer,
  userUpdateEducation: updateEducationReducer,
  userUpdateSkill: updateSkillReducer,
  userUpdateProject: updateProjectReducer,
  userUpdateExperience: updateExperienceReducer,
  userUpdateReference: updateReferenceReducer,
  userGetEducation: getEducationReducer,
  userGetSkill: getSkillReducer,
  userGetProject: getProjectReducer,
  userGetExperience: getExperienceReducer,
  userGetReference: getReferenceReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

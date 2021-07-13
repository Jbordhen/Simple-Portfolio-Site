import {
  USER_EDUCATION_CREATE_FAIL,
  USER_EDUCATION_CREATE_REQUEST,
  USER_EDUCATION_CREATE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROJECT_CREATE_FAIL,
  USER_PROJECT_CREATE_REQUEST,
  USER_PROJECT_CREATE_SUCCESS,
  USER_REFERENCE_CREATE_FAIL,
  USER_REFERENCE_CREATE_REQUEST,
  USER_REFERENCE_CREATE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_SKILL_CREATE_FAIL,
  USER_SKILL_CREATE_REQUEST,
  USER_SKILL_CREATE_SUCCESS,
  USER_WORK_EXPERIENCE_CREATE_FAIL,
  USER_WORK_EXPERIENCE_CREATE_REQUEST,
  USER_WORK_EXPERIENCE_CREATE_SUCCESS,
  USER_EDUCATION_DELETE_FAIL,
  USER_EDUCATION_DELETE_REQUEST,
  USER_EDUCATION_DELETE_SUCCESS,
  USER_EDUCATION_UPDATE_FAIL,
  USER_EDUCATION_UPDATE_REQUEST,
  USER_EDUCATION_UPDATE_SUCCESS,
  USER_PROJECT_DELETE_FAIL,
  USER_PROJECT_DELETE_REQUEST,
  USER_PROJECT_DELETE_SUCCESS,
  USER_PROJECT_UPDATE_FAIL,
  USER_PROJECT_UPDATE_REQUEST,
  USER_PROJECT_UPDATE_SUCCESS,
  USER_REFERENCE_DELETE_FAIL,
  USER_REFERENCE_DELETE_REQUEST,
  USER_REFERENCE_DELETE_SUCCESS,
  USER_REFERENCE_UPDATE_FAIL,
  USER_REFERENCE_UPDATE_REQUEST,
  USER_REFERENCE_UPDATE_SUCCESS,
  USER_SKILL_DELETE_FAIL,
  USER_SKILL_DELETE_REQUEST,
  USER_SKILL_DELETE_SUCCESS,
  USER_SKILL_UPDATE_FAIL,
  USER_SKILL_UPDATE_REQUEST,
  USER_SKILL_UPDATE_SUCCESS,
  USER_WORK_EXPERIENCE_DELETE_FAIL,
  USER_WORK_EXPERIENCE_DELETE_REQUEST,
  USER_WORK_EXPERIENCE_DELETE_SUCCESS,
  USER_WORK_EXPERIENCE_UPDATE_FAIL,
  USER_WORK_EXPERIENCE_UPDATE_REQUEST,
  USER_WORK_EXPERIENCE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_RESET,
  USER_EDUCATION_GET_FAIL,
  USER_EDUCATION_GET_REQUEST,
  USER_EDUCATION_GET_SUCCESS,
  USER_PROJECT_GET_FAIL,
  USER_PROJECT_GET_REQUEST,
  USER_PROJECT_GET_SUCCESS,
  USER_REFERENCE_GET_FAIL,
  USER_REFERENCE_GET_REQUEST,
  USER_REFERENCE_GET_SUCCESS,
  USER_SKILL_GET_FAIL,
  USER_SKILL_GET_REQUEST,
  USER_SKILL_GET_SUCCESS,
  USER_WORK_EXPERIENCE_GET_FAIL,
  USER_WORK_EXPERIENCE_GET_REQUEST,
  USER_WORK_EXPERIENCE_GET_SUCCESS
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload
      }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true }
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_PROFILE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDUCATION_GET_REQUEST:
      return { loading: true }
    case USER_EDUCATION_GET_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_EDUCATION_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROJECT_GET_REQUEST:
      return { loading: true }
    case USER_PROJECT_GET_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_PROJECT_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const getSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SKILL_GET_REQUEST:
      return { loading: true }
    case USER_SKILL_GET_SUCCESS:
      return { loading: false, skill: action.payload }
    case USER_SKILL_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const getExperienceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_WORK_EXPERIENCE_GET_REQUEST:
      return { loading: true }
    case USER_WORK_EXPERIENCE_GET_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_WORK_EXPERIENCE_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const getReferenceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REFERENCE_GET_REQUEST:
      return { loading: true }
    case USER_REFERENCE_GET_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_REFERENCE_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDUCATION_CREATE_REQUEST:
      return { loading: true }
    case USER_EDUCATION_CREATE_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_EDUCATION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROJECT_CREATE_REQUEST:
      return { loading: true }
    case USER_PROJECT_CREATE_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_PROJECT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const addSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SKILL_CREATE_REQUEST:
      return { loading: true }
    case USER_SKILL_CREATE_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_SKILL_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const addExperienceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_WORK_EXPERIENCE_CREATE_REQUEST:
      return { loading: true }
    case USER_WORK_EXPERIENCE_CREATE_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_WORK_EXPERIENCE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const addReferenceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REFERENCE_CREATE_REQUEST:
      return { loading: true }
    case USER_REFERENCE_CREATE_SUCCESS:
      return { loading: false, data: action.payload }
    case USER_REFERENCE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDUCATION_UPDATE_REQUEST:
      return { loading: true }
    case USER_EDUCATION_UPDATE_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_EDUCATION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROJECT_UPDATE_REQUEST:
      return { loading: true }
    case USER_PROJECT_UPDATE_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SKILL_UPDATE_REQUEST:
      return { loading: true }
    case USER_SKILL_UPDATE_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_SKILL_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateExperienceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_WORK_EXPERIENCE_UPDATE_REQUEST:
      return { loading: true }
    case USER_WORK_EXPERIENCE_UPDATE_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_WORK_EXPERIENCE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateReferenceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REFERENCE_UPDATE_REQUEST:
      return { loading: true }
    case USER_REFERENCE_UPDATE_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_REFERENCE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDUCATION_DELETE_REQUEST:
      return { loading: true }
    case USER_EDUCATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_EDUCATION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROJECT_DELETE_REQUEST:
      return { loading: true }
    case USER_PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SKILL_DELETE_REQUEST:
      return { loading: true }
    case USER_SKILL_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_SKILL_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteExperienceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_WORK_EXPERIENCE_DELETE_REQUEST:
      return { loading: true }
    case USER_WORK_EXPERIENCE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_WORK_EXPERIENCE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteReferenceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REFERENCE_DELETE_REQUEST:
      return { loading: true }
    case USER_REFERENCE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_REFERENCE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

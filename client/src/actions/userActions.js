import axios from 'axios'
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

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/login', { ...formData }, config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_REGISTER_RESET })
}

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const { data } = await axios.post('/api/signup', { ...formData })

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const updateProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      '/api/users/update',
      { ...formData },
      config
    )

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data
    })

    localStorage.setItem(
      'userInfo',
      JSON.stringify({ token: userInfo.token, user: data })
    )
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const getUserList = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.get('/api/users', config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors
        : error.message

    dispatch({ type: USER_LIST_FAIL, payload: message })
  }
}

export const getEducation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_EDUCATION_GET_REQUEST
    })

    const config = {
      // headers: {
      //   Authorization: `Bearer ${userInfo.token}`
      // }
    }

    const { data } = await axios.get('/api/educations' + id, config)

    dispatch({
      type: USER_EDUCATION_GET_SUCCESS,
      payload: data
    })

    // localStorage.setItem(
    //   'userInfo',
    //   JSON.stringify({ token: userInfo.token, user: data })
    // )
  } catch (error) {
    dispatch({
      type: USER_EDUCATION_GET_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const getExperience = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_WORK_EXPERIENCE_GET_REQUEST })

    const { data } = await axios.get(`/api/work_experiences/${id}`)

    dispatch({
      type: USER_WORK_EXPERIENCE_GET_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_WORK_EXPERIENCE_GET_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const getProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROJECT_GET_REQUEST })

    const { data } = await axios.get(`/api/projects/${id}`)

    dispatch({
      type: USER_PROJECT_GET_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_PROJECT_GET_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const getSkill = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_SKILL_GET_REQUEST })

    const { data } = await axios.get(`/api/skills/${id}`)
    console.log('inside action' + id)
    dispatch({
      type: USER_SKILL_GET_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_SKILL_GET_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const getReference = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_REFERENCE_GET_REQUEST })

    const { data } = await axios.get(`/api/references/${id}`)

    dispatch({
      type: USER_REFERENCE_GET_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_REFERENCE_GET_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const addEducation = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDUCATION_CREATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(
      '/api/educations',
      { ...formData },
      config
    )

    dispatch({
      type: USER_EDUCATION_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_EDUCATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const addExperience = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_WORK_EXPERIENCE_CREATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(
      '/api/work_experiences',
      { ...formData },
      config
    )

    dispatch({
      type: USER_WORK_EXPERIENCE_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_WORK_EXPERIENCE_CREATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const addProject = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROJECT_CREATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post('/api/projects', { ...formData }, config)

    dispatch({
      type: USER_PROJECT_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_PROJECT_CREATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const addSkill = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SKILL_CREATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post('/api/skills', { ...formData }, config)

    dispatch({
      type: USER_SKILL_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_SKILL_CREATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const addReference = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REFERENCE_CREATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(
      '/api/references',
      { ...formData },
      config
    )

    dispatch({
      type: USER_REFERENCE_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_REFERENCE_CREATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const updateEducation = (formData, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDUCATION_UPDATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      '/api/educations/' + id,
      { ...formData },
      config
    )

    dispatch({
      type: USER_EDUCATION_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_EDUCATION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const updateExperience =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_WORK_EXPERIENCE_UPDATE_REQUEST })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.put(
        '/api/work_experiences/' + id,
        { ...formData },
        config
      )

      dispatch({
        type: USER_WORK_EXPERIENCE_UPDATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: USER_WORK_EXPERIENCE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.errors
            ? error.response.data.errors
            : error.message
      })
    }
  }

export const updateProject = (formData, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROJECT_UPDATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      '/api/projects/' + id,
      { ...formData },
      config
    )

    dispatch({
      type: USER_PROJECT_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const updateSkill = (formData, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SKILL_UPDATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      '/api/skills/' + id,
      { ...formData },
      config
    )

    dispatch({
      type: USER_SKILL_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_SKILL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const updateReference = (formData, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REFERENCE_UPDATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      '/api/references/' + id,
      { ...formData },
      config
    )

    dispatch({
      type: USER_REFERENCE_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_REFERENCE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDUCATION_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete('/api/educations/' + id, config)

    dispatch({
      type: USER_EDUCATION_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_EDUCATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_WORK_EXPERIENCE_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete('/api/work_experiences/' + id, config)

    dispatch({
      type: USER_WORK_EXPERIENCE_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_WORK_EXPERIENCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROJECT_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete('/api/projects/' + id, config)

    dispatch({
      type: USER_PROJECT_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_PROJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const deleteSkill = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SKILL_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete('/api/skills/' + id, config)

    dispatch({
      type: USER_SKILL_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_SKILL_DELETE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

export const deleteReference = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REFERENCE_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete('/api/references/' + id, config)

    dispatch({
      type: USER_REFERENCE_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_REFERENCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.message
    })
  }
}

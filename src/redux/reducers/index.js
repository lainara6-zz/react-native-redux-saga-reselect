import c from '../../constants'
import { combineReducers } from 'redux'

const userState = {
	list: [],
	gender: 'all',
	fetching: false,
	fetchError: false
};

export const users = (state = userState, action) => {
	switch (action.type) {
		case c.FETCH_USER:
			return { ...state, fetching: true }
		case c.FETCH_USER_SUCCESS:
			return { ...state, list: action.payload, fetching: false, fetchError: false }
		case c.FETCH_USER_FAILED:
			return { ...state, fetchError: true, fetching: false }
		case c.FILTER_USER_BY_GENDER:
		 	return { ...state, gender: action.payload.gender }
		default:
			return state
	}
}

export const rootReducer = combineReducers({ users })
import c from '../../constants'

export const fetchUser = (page, count) => {
	return {
		type: c.FETCH_USER,
		payload: {page, count}
	}
}

export const filterUserByGender = gender => {
	return {
		type: c.FILTER_USER_BY_GENDER,
		payload: {gender}
	}
}
import c from "../../constants"
import axios from "axios"
import {
	call,
	put,
	all,
	takeLatest
} from "redux-saga/effects";

/******************************************************************************/
/*******************************  Worker  *************************************/
/******************************************************************************/

export function* fetchUser(action) {
	try {
		const response = yield call(
			axios.get,
			"https://randomuser.me/api/?page=" + action.payload.page + "&results=" + action.payload.count
		);
		yield put({ type: c.FETCH_USER_SUCCESS, payload: response.data.results });
	} catch (error) {
		yield put({
			type: c.FETCH_USER_FAILED,
			payload: error
		});
	}
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchFetchUser() {
	yield takeLatest(c.FETCH_USER, fetchUser);
}

/******************************************************************************/
/*******************************   Root   *************************************/
/******************************************************************************/

export default function* root() {
	yield all([
		call(watchFetchUser),
	]);
}
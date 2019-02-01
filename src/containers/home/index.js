import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'
import { fetchUser, filterUserByGender } from '../../redux/actions'

class Home extends Component {

	componentDidMount() {
		this.initialFetchPeople()
	}

	render() {
		let styles = {
			container: {
				flex: 1,
				backgroundColor: "white",
				justifyContent: "center",
				alignItems: "center"
			}
		}

		console.log('UI is redering...!')

		return (
			<View style={styles.container}>
				<Button title='All' style={{ marginTop: 30 }} onPress={() => { this.filterUserByGender('all') }}></Button>
				<Button title='Male' style={{ marginTop: 30 }} onPress={() => { this.filterUserByGender('male') }}></Button>
				<Button title='Female' style={{ marginTop: 30 }} onPress={() => { this.filterUserByGender('female') }}></Button>
				<Text style={{ marginTop: 30 }}>Count {this.props.list.length}</Text>
			</View>
		)
	}

	initialFetchPeople = () => {
		this.props.fetchUser(1, 5)
	}

	filterUserByGender = gender => {
		this.props.filterUserByGender(gender)
	}
}

/* Without reselect */
/*const getPeopleByGender = (state) => {
	switch (state.users.gender) {
		case 'all':
			return state.users.list.filter((item, index) => { return (item.gender == 'male' || item.gender == 'female') })
		case 'male':
			return state.users.list.filter((item, index) => { return (item.gender == 'male') })
		case 'female':
			return state.users.list.filter((item, index) => { return (item.gender == 'female') })
	}
}*/

/* With reselect */
const getList = (state) => state.users.list
const getGender = (state) => state.users.gender
const getPeopleByGender = createSelector(
	[getList, getGender],
	(list, gender) => {
		switch (gender) {
			case 'all':
				return list.filter((item, index) => { return (item.gender == 'male' || item.gender == 'female') })
			case 'male':
				return list.filter((item, index) => { return (item.gender == 'male') })
			case 'female':
				return list.filter((item, index) => { return (item.gender == 'female') })
		}
	}
)

const mapStateToProps = state => {
	return {
		list: getPeopleByGender(state)
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchUser,
		filterUserByGender
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Home)
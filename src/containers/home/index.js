import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'
import { fetchUser, filterUserByGender } from '../../redux/actions'
import { FlatList } from 'react-native'
import {
	Container,
	Header,
	Left,
	Body,
	Right,
	Button,
	Segment,
	Content,
	Text,
	List,
	ListItem,
	Thumbnail
} from 'native-base'

class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			segmentIndex: 0
		}
	}

	componentDidMount() {
		this.initialFetchPeople()
	}

	render() {

		console.log('UI is redering...!')

		return (
			<Container>
				<Header hasSegment>
					<Body>
						<Segment style={{ width: 240 }}>
							<Button
								style={{
									width: 80,
									justifyContent: 'center'
								}}
								onPress={() => this.segmentIndexChanged(0, 'all')}
								active={this.state.segmentIndex === 0} first>
								<Text>All</Text>
							</Button>
							<Button
								style={{
									width: 80,
									justifyContent: 'center'
								}}
								onPress={() => this.segmentIndexChanged(1, 'male')}
								active={this.state.segmentIndex === 1}>
								<Text>Male</Text>
							</Button>
							<Button
								style={{
									width: 80,
									justifyContent: 'center'
								}}
								onPress={() => this.segmentIndexChanged(2, 'female')}
								active={this.state.segmentIndex === 2} last>
								<Text>Female</Text>
							</Button>
						</Segment>
					</Body>
				</Header>
				<Content>
					<List>
						<FlatList
							data={this.props.list}
							renderItem={({ item }) => {
								return (
									<ListItem avatar noIndent noBorder>
										<Left>
											<Thumbnail source={{ uri: item.picture.thumbnail }} />
										</Left>
										<Body>
											<Text>{item.name.first + ' ' + item.name.last}</Text>
											<Text note>{item.phone}</Text>
										</Body>
									</ListItem>
							)}} 
							keyExtractor={(_, index) => index.toString() }/>
					</List>
				</Content>
			</Container>
		)
	}

	segmentIndexChanged = (index, gender) => {
		this.setState({ segmentIndex: index })
		this.props.filterUserByGender(gender)
	}

	initialFetchPeople = () => {
		this.props.fetchUser(1, 10)
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

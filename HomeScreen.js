import React from 'react';
import {
	Button,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		destinations = [
			{
				title: 'Left To Drop',
				screen: 'Categories',
			},
			{
				title: 'Already Dropped',
				screen: 'Categories',
			},
			{
				title: 'Favorites',
				screen: 'Favorites',
			}
		]

		this.state = {
			dataSource: ds.cloneWithRows(destinations),
		};
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<ListView style={styles.container}
				dataSource={this.state.dataSource}
				renderRow={this._renderRow.bind(this)}
				renderSeparator={(sectionID, rowID) =>
					<View
						key={rowID}
						style={styles.separator}
					/>
				}
			/>
		);
	}

	_onPressRow(rowID: number) {
		const { navigate } = this.props.navigation;
		navigate(destinations[rowID].screen);
	}

	_renderRow(rowData: string, sectionID: number, rowID: number) {
		return (
			<TouchableHighlight
				onPress = {this._onPressRow.bind(this, rowID)}
				underlayColor = 'whitesmoke'>
				<View style={styles.cell}>
					<Text style={styles.text}>
						{rowData.title}
					</Text>
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	cell: {
		alignItems: 'flex-start',
		flex: 1,
		height: 50,
		justifyContent: 'center'
	},
	container: {
		backgroundColor: 'white'
	},
	separator: {
		backgroundColor: '#EEEEEE',
		flex: 1,
		height: 1
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		marginLeft: 15,
		textAlign: 'left',
	},
})

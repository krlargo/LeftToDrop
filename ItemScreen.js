import React from 'react';
import {
	Alert,
	Button,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ItemScreen extends React.Component {
	render() {
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.view}>
				<Text style={styles.text}>You're looking at an actual bogo</Text>
				<View style={styles.image}>
				</View>

				<View style={styles.caption}>
					<View style={styles.ratingContainer}>

						<TouchableHighlight
							style={styles.copButton}
              onPress={()=>{Alert.alert('Upvoted')}}>
								<Text style={styles.buttonText}>Cop</Text>
						</TouchableHighlight>			
	
						<TouchableHighlight
							style={styles.favoriteButton}
              onPress={()=>{Alert.alert('Favorited')}}>
							<Text style={styles.buttonText}>Favorite</Text>
						</TouchableHighlight>	

						<TouchableHighlight
							style={styles.dropButton}
              onPress={()=>{Alert.alert('Downvoted')}}>
							<Text style={styles.buttonText}>Drop</Text>
						</TouchableHighlight>

					</View>

					<View style={styles.chat}>
					</View>			

				</View>		
			</View>
		)
	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.item,
	});
}

const styles = StyleSheet.create({
	buttonText: {
		color: 'white',
		fontFamily: 'Futura',
		fontStyle: 'italic',
		fontSize: 20,
		textAlign: 'center'
	},
	caption: {
		backgroundColor: 'transparent',
		flex: 1,
		margin: 15,
		marginTop: 0
	},
	chat: {
		backgroundColor: 'lightgray',
		borderRadius: 3,
		flex: 1,
		marginTop: 5
	},
  copButton: {
    backgroundColor: 'red',
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    marginRight: 2.5,
  },
	dropButton: {
		backgroundColor: 'black',
		borderRadius: 3,
		flex: 1,
		justifyContent: 'center',
		marginLeft: 2.5,
	},
	favoriteButton: {
		backgroundColor: 'blue',
		borderRadius: 3,
		flex: 1,
		justifyContent: 'center',
		marginLeft: 2.5,
		marginRight: 2.5
	},
	image: {
		backgroundColor: 'blue',
		borderRadius: 3,
		flex: 2,
		margin: 15,
		marginBottom: 5
	},
	ratingContainer: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		height: 35,
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		margin: 15,
		marginBottom: 0,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	view: {
		backgroundColor: 'white',
		flex: 1,
	}
})

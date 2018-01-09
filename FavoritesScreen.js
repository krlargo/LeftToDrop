import React from 'react';
import * as firebase from 'firebase';

import {
	Alert,
	AsyncStorage,
	Button,
	DeviceEventEmitter,
	Dimensions,
	Image,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import GridView from 'react-native-gridview';

import EmptyScreen from './EmptyScreen.js';
import LoadingScreen from './LoadingScreen.js';

const itemsPerRow = 3;

export default class FavoritesScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r2 !== r2,
			}),
		}
		this.firebaseApp = props.screenProps;
		this.itemsRef = this.firebaseApp.database().ref().child('items');
		this.favorites = this.loadFavorites();
	}

	componentWillMount() {
		favorites = this.loadFavorites();
	}

	async loadFavorites() {
    var favorites = [];
    try {
      favorites = await AsyncStorage.getItem('favorites');
      this.favorites = JSON.parse(favorites);
    } catch(error) {
      Alert.alert('Load error');
			throw error
    }
		return favorites;
	}

	getRef() {
		return this.props.firebaseApp.database().ref();
	}

	render() {
		if(this.state.isLoading) {
			return(<LoadingScreen />)
		}
		if(this.state.dataSource.getRowCount() === 0) {
			return(<EmptyScreen message="No favorited items." />)
		} else {
			return(
				<View style={styles.container}>
						<ListView contentContainerStyle={styles.listView}
							dataSource={this.state.dataSource}
							renderRow={this._renderCell.bind(this)}
	 					/>
				</View>
			);
		}
	}

	async listenForItems() {
    var favorites = [];
    try {
      favorites = await AsyncStorage.getItem('favorites');
      this.favorites = JSON.parse(favorites);
    } catch(error) {
      Alert.alert('Load error');
			throw error;
    }
		this.itemsRef.on('value', (snap) => {
			var items = [];

			snap.forEach((child) => {
				if(this.contains(favorites,child.key)) {
        	items.push({
         		// Assign button title to items['name']
         		name: child.val().name,
          	image: child.val().image,
          	_key: child.key
        	});
				}
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items),
			});
		});
	}

	contains(a,obj) {
		for(var i = 0; i < a.length; i++) {
			if(a[i] === obj) {
				return true;
			}
		}
		return false;
	}

	componentDidMount() {
		this.listenForItems();
		DeviceEventEmitter.addListener('favoriteChanged', this.setState(this.state));
	}

	_onPressCell(cellID, item) {
		const { navigate } = this.props.navigation;
		navigate('Item', { item: item });
	}

	_renderCell(item, sectionID, rowID) {
		return(
			<View style={styles.cell}>
				<TouchableOpacity
					onPress = {this._onPressCell.bind(this, rowID, item)}>
					<Image
						style={styles.cellImage}
						source={{uri: item.image}} />
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	cell: {
		aspectRatio: 1,
		backgroundColor: 'white',
		borderRadius: 3,
		justifyContent: 'center',
		margin: 5,
		overflow: 'hidden',
		width: Dimensions.get('window').width/3-5*2.7,
	},
	cellImage: {
		height: 100,
		resizeMode: 'contain'
	},
	container: {
		alignItems: 'center',
		backgroundColor: 'whitesmoke',
		flex: 1,
	},
	listView:	{
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 5
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	view: {
		backgroundColor: 'white',
		flex: 1,
	}
});
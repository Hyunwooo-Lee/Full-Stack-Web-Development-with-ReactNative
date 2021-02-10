import React, { Component } from 'react';
import Menu from './MenuComponent';
import  { DISHES } from '../shared/dishes';
import Dishdetail from './DishDetailComponent';
import { View,  Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer }from 'react-navigation';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
}, {
    initialRouteName: 'Menu',
    defaultNavigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color:'#fff'
        }
    })
})

const Apps = createAppContainer(MenuNavigator);

class Main extends Component {

    render() {
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <Apps />
            </View>            
        )
    }
}

export default Main;
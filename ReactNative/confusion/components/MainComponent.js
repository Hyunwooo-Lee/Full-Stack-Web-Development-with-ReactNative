import React, { Component } from 'react';
import { View, SafeAreaView,  StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from  './ContactComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreater';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
});


{/** USE OF CURRENT VERSION OF REACT NATIVE

Adoption of hints from https://reactnavigation.org/docs/stack-navigator/,
 https://reactnavigation.org/docs/drawer-based-navigation and 
 https://www.coursera.org/learn/react-native/discussions/weeks/1/threads/8PifLG4EQ724nyxuBDO9DQ

npm install @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens
    react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
npm install @react-native-community/masked-view
npm install react-native-safe-area-context
*/}

{/** Navigation Part 1 - Menu and Dishdetail */}
const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={{                    
                    headerLeft: () => (
                        <Icon name='menu' size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()} />
                    ),                    
                }}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
        
    );
}

{/** Navigation Part 2 - Home and Drawer Navigation */}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
  return(
      <HomeNavigator.Navigator
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <HomeNavigator.Screen
              name="Home"
              component={Home}
              options={{                    
                headerLeft: () => (
                    <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()} />
                ),                    
            }}
          />         
      </HomeNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({ navigation }) {
  return(
      <AboutNavigator.Navigator
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <AboutNavigator.Screen
              name="About us"
              component={About}
              options={{                    
                headerLeft: () => (
                    <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()} />
                ),                    
            }}
          />         
      </AboutNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({ navigation }) {
  return(
      <ContactNavigator.Navigator
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <ContactNavigator.Screen
              name="Contact"
              component={Contact}
              options={{                    
                headerLeft: () => (
                    <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()} />
                ),                    
            }}
          />         
      </ContactNavigator.Navigator>
  );
}

const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen({ navigation }) {
  return(
      <ReservationNavigator.Navigator
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#512DA8"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                  color: "#fff"            
              }
          }}
      >
          <ReservationNavigator.Screen
              name="Reserve Table"
              component={Reservation}
              options={{                    
                headerLeft: () => (
                    <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()} />
                ),                    
            }}
          />         
      </ReservationNavigator.Navigator>
  );
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props}>
        <SafeAreaView sytle={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />            
        </SafeAreaView>      
    </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

function MainNavigator({ navigation }) {
    return(
        <Drawer.Navigator initialRouteName="Home"
            drawerStyle = {{backgroundColor: '#D1C4E9'}}
            drawerContent = {(props) => <CustomDrawerContentComponent {...props}/>}>
                
          <Drawer.Screen name="Home" component={HomeNavigatorScreen} 
            options={{
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor} />
                )
            }} />
          <Drawer.Screen name="About Us" component={AboutNavigatorScreen} 
            options={{
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor} />
                )
            }} />
          <Drawer.Screen name="Menu" component={MenuNavigatorScreen} 
            options={{
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={22}
                        color={tintColor} />
                )
            }} />
          <Drawer.Screen name="Contact Us" component={ContactNavigatorScreen} 
            options={{
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor} />
                )
            }} />
            <Drawer.Screen name="Reserve Table" component={ReservationNavigatorScreen} 
            options={{
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='cutlery'
                        type='font-awesome'
                        size={24}
                        color={tintColor} />
                )
            }} />
        </Drawer.Navigator>

    );
}
  
class Main extends Component {

  componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
  }

  render() {
 
    return (
      <NavigationContainer style={{flex: 1}}>   
        <MainNavigator />
      </NavigationContainer>
    );
  }
}

const styles  = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
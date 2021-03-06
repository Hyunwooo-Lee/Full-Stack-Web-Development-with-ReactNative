import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, ImageBackgroundBase} from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {        
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
                />
        )
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})                
            )
            .catch((error) => console.log('Could not save user info', error));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return(
            <View style={styles.contativer}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={
                            <Icon 
                                name='sign-in' 
                                type='font-awesome'
                                size={24}
                                color='white' 
                                />
                        }
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        //background="white"
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome'
                                size={24}
                                color='blue' 
                                />
                        }
                        titleStyle={{color:"blue"}}
                        buttonStyle={{backgroundColor: 'parent'}}
                        />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermissions.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!capturedImage.cancelled) {
                this.processImage( capturedImage.uri );
            }
        }
    }

    getImageFromGallery = async () => {
        const mediaLibraryPermissions = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        if (mediaLibraryPermissions.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!capturedImage.cancelled) {
                this.processImage( capturedImage.uri );
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: { width: 400 }}
            ],
            { format: 'png' }
        );
        this.setState({ imageUrl : processedImage.uri })
        console.log(''+processedImage.uri)
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})                
            )
            .catch((error) => console.log('Could not save user info', error));
        }
    }
    

    render() {
        return(
            <SafeAreaView>
            <View style={styles.contatainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: this.state.imageUrl }}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image}
                        />
                    <Button
                        title='Camera'
                        onPress={this.getImageFromCamera}                        
                        />
                    <Button
                        title='Gallery'
                        onPress={this.getImageFromGallery}
                        />
                </View>
                <Input 
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}                    
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Firstname"
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}                    
                    />
                <Input
                    placeholder="Lastname"
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}                    
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}                    
                    />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title='Register'
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome'
                                size={24}
                                color='white' 
                                />
                        }
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        />
                </View>
            </View>
            </SafeAreaView>
        );
    }
}

const LoginNavigator = createBottomTabNavigator();

function Login( {navigation} ) {
    return(
        <LoginNavigator.Navigator
            
            tabBarOptions={{
                activeBackgroundColor: '#9575CD',
                inactiveBackgroundColor: '#D1C4E9',
                activeTintColor: 'white',
                inactiveTintColor: 'grey',
                
            }}>
            <LoginNavigator.Screen name="Login" component={LoginTab} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            size={24}
                            color={color}                            
                            />
                    )
                }}
                />
            <LoginNavigator.Screen name="Register" component={RegisterTab} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='user-plus'
                            type='font-awesome'
                            size={24}                            
                            color={color}   
                            />
                    )
                }}
                />
        </LoginNavigator.Navigator>
    );    
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 40,        
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20
    }, 
    image: {
        margin : 10,
        width: 60,
        height: 50,
        
    },
    formInput: {
        margin: 10,
        width: 380,
        marginBottom: 0     
    },
    formCheckbox: {
        margin: 10, 
        backgroundColor: null
    },
    formButton: {
        margin: 30
    }
});  


export default Login;
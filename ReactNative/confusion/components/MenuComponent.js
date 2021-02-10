import React, { Component } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes'


class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: 'Menu'
    }   

    render() {

        const styles = StyleSheet.create({
            tinyLogo: {
              width: 50,
              height: 50,
            },
        });
    
        const renderMenuItem = ({item, index}) => {    
            return (                
                    <ListItem onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                        <Image style={styles.tinyLogo} source={require('./images/uthappizza.png')}/>
                         <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>                    
                    </ListItem>
            );
        };

        const { navigate } = this.props.navigation;
        return (        
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }
    
}

export default Menu;
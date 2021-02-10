import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';

function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card>
                
                <Card.Image source={require('./images/uthappizza.png')} style={{paddingTop: 20, alignItems: 'center'}} >
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                </Card.Image>                
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>

            </Card>
        );
    }
    else  {
        return(<View></View>)
    }
}

function Dishdetail(props) {
    return(<RenderDish dish={props.dish} />)
}

export default Dishdetail;
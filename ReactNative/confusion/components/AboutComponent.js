import React, { Component, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Image, SafeAreaView} from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';




const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

class About extends Component {
    

    render() {
        const styles = StyleSheet.create({
            tinyLogo: {
              width: 50,
              height: 50,
            },
        });
    
        const renderLeaderItem = ({item, index}) => {    
            return (                
                    <ListItem>
                        <Image style={styles.tinyLogo} source={{ uri: baseUrl + item.image }} />
                         <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>                    
                    </ListItem>
            );
        }
        if (this.props.leaders.isLoading) {
            return(
                <SafeAreaView style={{flex: 1}}>
                    <Card>                
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Loading />
                    </Card>
                </SafeAreaView>
            );
        }
        else if (this.props.leaders.errMess) {
            return (
                
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <Card>                
                            <Card.Title>Our History</Card.Title>
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </Animatable.View>                    
                
            );
        }
        else {
            return(
                <ScrollView style={{flex: 1}}>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <Card>                
                            <Card.Title>Our History</Card.Title>                             
                            <Text style={{margin: 10}}>
                                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                            </Text>
                            <Text style={{margin: 10}}>
                                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                            </Text>
                        </Card>                        
                        <Card>                
                            <Card.Title>Corporate Leadership</Card.Title>
                            <FlatList 
                                data={this.props.leaders.leaders}
                                renderItem={renderLeaderItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        </Card>
                    </Animatable.View>                    
                </ScrollView>         
            );
        }        
    }
}

export default connect(mapStateToProps)(About);
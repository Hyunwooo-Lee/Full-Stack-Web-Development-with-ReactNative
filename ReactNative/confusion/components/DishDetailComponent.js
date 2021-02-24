import React, { Component } from 'react';
import { View, Text, Modal, FlatList, SafeAreaView, Button, TextInput, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreater';
import { postComment } from '../redux/ActionCreater';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});
 
function RenderDish(props) {
    const dish = props.dish;    

    handleViewRef =  ref => {this.view = ref;}

    const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
        if( dx < -200 )
            return true;
        else
            return false;
    };

    const recognizeDragforModal = ({ moveX, moveY, dx, dy}) => {
        if( dx > 200 )
            return true;
        else
            return false;
    };
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished  ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e,  gestureState) => {
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                        }
                    ],
                    { cancelable: false }
                )
            }
            else if (recognizeDragforModal(gestureState)) {
                props.toggleModal();
            }
            return true;
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    }

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card>                
                    <Card.Image source={{uri: baseUrl + dish.image}} style={{justifyContent: 'center', alignItems: 'center'}} >
                        <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                    </Card.Image>                
                    <Text style={{margin: 10}}> 
                        {dish.description}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o' }
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} 
                            />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.showModal ? console.log('Already opened') : props.toggleModal()} 
                            />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl+dish.image)}
                            />
                    </View>
                </Card>
            </Animatable.View>
            
        );
    }
    else  {
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <Rating 
                        readonly={true}
                        startingValue={item.rating}
                        imageSize={14}
                        showRating={false}
                        ratingCount={5}/>
                </View>                
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }
    if(comments != null) {
        return(
            <SafeAreaView style={{flex: 1}}>
                <View>
                    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                        <Card>
                            <Card.Title>Comments</Card.Title>
                            <FlatList
                                contentContainerStyle={{paddingBottom:120}}
                                data={comments}
                                renderItem={renderCommentItem}
                                keyExtractor={item => item.id.toString()} />
                        </Card>
                    </Animatable.View> 
                </View>
            </SafeAreaView>
        );
    }
    else  {
        return(<View></View>)
    }
    
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 3,
            author: '',
            comment: ''
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleComment(dishId, rating, author, comment) {
        //console.log(JSON.stringify(this.state));        
        this.toggleModal();
        this.props.postComment(dishId, rating, author, comment);
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }    

    static navigationOptions = {
        title: 'Dish Detail'
    }

    render() {
        const dishId = this.props.route.params.dishId

        return(
            <View style={{flex: 1}}>                
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}                    
                    showModal={this.state.showModal}
                    dishId={dishId}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                    >
                    <Rating
                        imageSize={60}
                        showRating
                        onFinishRating={(rating) => this.setState({rating: rating})}
                        />
                    <TextInput style={{margin: 10, paddingBottom: 10}}
                        underlineColorAndroid = 'grey'
                        onChangeText={(text) => this.setState({author: text})}
                        placeholder="Author"
                        />
                    <TextInput style={{margin: 10, paddingBottom: 10}}
                        underlineColorAndroid = 'grey'
                        onChangeText={(text) => this.setState({comment: text})}
                        placeholder="comments"
                        />
                    <View style={{margin:10}}>
                        <Button style={{justifyContent: 'center', alignItems: ''}}
                            onPress={() => {
                                this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment);                                        
                            }}
                            color='#512DA8'
                            title='submit'       
                            />
                    </View>
                    <View style={{margin:10}}>
                        <Button 
                            onPress={() => this.toggleModal()}
                            color='grey'
                            title='cancel'                                                      
                            />
                    </View>
                </Modal>
            </View>
                    
        );
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
import React , { Component }from 'react';
import { AppRegistry, StyleSheet, View, Platform, Image } from 'react-native';
import { ROOMS_CREATE_ROOM_MUTATION } from './../TypesDef'
import { ALL_ROOMS_QUERY } from './../TypesDef'
import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';
import {
 Spinner,
 Container,
 Button,
 Item,
 Input,
 Picker,
 Label,
 H1,
 Text
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { roomActionCreators } from "./../roomsRedux";
import { asyncWrapFunction } from './../../utils';

const mapStateToProps = (state) => ({
 queryParams: state.queryParams,
})

export class RoomsCreateRoom extends Component{
 constructor(props){
   super(props);
   this.onForm = this.onForm.bind(this);
   this.onCreateRoom = this.onCreateRoom.bind(this);
   this.state = {
     selected1: "key1"
   };
 }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
    Store.dispatch(roomActionCreators.addRoomCategory(value));
  }

 onForm(createRoom){
   return (
    <Container style={{flex:1,paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>

      <Grid>
        <Col size={1}></Col>
        <Col size={20}>
          {/*TITLE*/}
          <Row size={2}>
            <Text style={styles.titleElement}>Create Room</Text>
          </Row>
          {/*NAME ROOM*/}
          <Row size={1}>
            <Col size={1}></Col>
            <Col size={6}>
            <Item floatingLabel>
              <Label style={{color:'white'}}>Room Name</Label>
              <Input style={{color:'white'}}
               onChangeText= {(text)=>{
                 Store.dispatch(roomActionCreators.addRoomName(text));
               }}
               />
            </Item>
            </Col>
            <Col size={1}></Col>
          </Row>
          {/*DESCRIPTION*/}
          <Row size={1}>
            <Col size={1}></Col>
            <Col size={6}>
            <Item floatingLabel>
              <Label style={{color:'white'}}>Description</Label>
               <Input style={{color:'white'}}
                 onChangeText= {(text)=>{
                   Store.dispatch(roomActionCreators.addRoomDescription(text));
                 }}
               />
           </Item>
           </Col>
          <Col size={1}></Col>
          </Row>
          {/*CATEGORY*/}
          <Row size={1}>
            <Col size={1}></Col>
            <Col size={6}>
              <Text style = {styles.textElement} >Category</Text> 
              <Picker
                placeholder="hola"
                style = {styles.pickerElement}
                mode="dropdown"
                selectedValue={this.state.selected1}
                onValueChange={
                  this.onValueChange.bind(this)
                }
              >
                <Picker.Item label="Books" value="books" />
                <Picker.Item label="Gamming" value="gamming" />
                <Picker.Item label="Languages" value="languages" />
                <Picker.Item label="Math" value="math" />
                <Picker.Item label="Movies" value="movies" />
                <Picker.Item label="Music" value="music" />
                <Picker.Item label="Politics" value="politics" />
                <Picker.Item label="Programming" value="programming" />
                <Picker.Item label="Relaxing" value="relaxing" />
                <Picker.Item label="Science" value="science" />
              </Picker>
            </Col>
            <Col size={1}></Col>
          </Row>
          {/*BUTTON*/}
          <Row size={1}>
            <Col size={1}></Col>
            <Col size={4}>
            <Button
              block
              style={styles.buttonElement}
              onPress={() => {
                Store.dispatch(roomActionCreators.addRoomOwner(Store.getState().currentUser.id));
                let newRoom = {
                  room: Store.getState().roomCreateParams 
                }
                console.log(newRoom.room);
                asyncWrapFunction(createRoom, newRoom).then(() => {
                  this.setState({formSended: true});
                })
             }}
            >
            <Text>Create!</Text>
            </Button>
            </Col>
            <Col size={1}></Col>
          </Row>
          <Row>
            <Col size={1}></Col>
             <Col size={3}>
            <Image 
              style = { styles.imageElement }
              source = { require('./../../logo-white.png' ) }
            />
          </Col>
          <Col size={1}></Col>
          </Row>
        </Col>
        <Col size={1}></Col>
      </Grid>
      

    </Container>
   )
 };

 onCreateRoom(data){
   console.log(data);
   Store.dispatch( roomActionCreators.addCurrentRoomId(data.createRoom.idRoom));
   return (
     <Spinner />
   )
 };

 componentDidUpdate(prevProps, prevState) {
   if(this.state.formSended){
    const currentRoomId = Store.getState().roomCreateParams.currentRoomId;
    this.props.navigation.navigate('RoomsDetail', { roomId: currentRoomId});
   }
 }

 render(){
   return (
     <Mutation 
       mutation={ROOMS_CREATE_ROOM_MUTATION}
       update={(cache, { data: data })=>{
         let newRoom = data.createRoom;

         const dataList = cache.readQuery({
           query: ALL_ROOMS_QUERY
         });
         cache.writeQuery({
           query: ALL_ROOMS_QUERY,
           data: {
             allRooms: [...dataList.allRooms, newRoom],
           },
         })
       }}  
     >
       {(createRoom, { loading, error, data }) => (
         <View style={styles.container}>
         {(data ? this.onCreateRoom(data) : this.onForm(createRoom))}  
         {loading && <Spinner />}
         {error && <Text> Error: ${error}</Text>}  
         </View>
       )}
     </Mutation>
   )
 }
}

export default connect(mapStateToProps)(RoomsCreateRoom)

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#174557',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
 
  },
 
  titleElement: {
    margin: 20,
    color: 'white',
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
  textElement:{
    color:'white',
    textAlign: "left",
  },
 
  pickerElement: {
    height: 70,
    width: 300,
    alignSelf: 'center',
    color:'white'
  },
 
  buttonElement:{
    backgroundColor: '#26d3cd',
    borderRadius: 8,
  },
  
  imageElement:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    padding: 3,
  },
 
})
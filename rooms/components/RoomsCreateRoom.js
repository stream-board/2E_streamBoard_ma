import React , { Component }from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { ROOMS_CREATE_ROOM_MUTATION } from './../TypesDef'
import { ALL_ROOMS_QUERY } from './../TypesDef'
import { Mutation } from 'react-apollo';
import Store from './../../reduxConfig';
import {
 Spinner,
 Container,
 Header,
 Content,
 Button,
 Form,
 Item,
 Input,
 Picker,
 Label,
 H1,
 Body,
 Left,
 Right,
 Icon,
 Fab,
 Title,
 Footer
} from 'native-base';
import { connect } from 'react-redux';
import { roomActionCreators } from "./../roomsRedux";

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
     <Container style={{flex:1}}>
       <H1 style={styles.titleElement}>Create Room</H1>
       <Item floatingLabel style={styles.formElement}>
       <Label>Room Name</Label>
         <Input
         onChangeText= {(text)=>{
           Store.dispatch(roomActionCreators.addRoomName(text));
         }}
         />
       </Item>

       <Item floatingLabel style={styles.formElement}>
       <Label>Description</Label>
         <Input
           onChangeText= {(text)=>{
             Store.dispatch(roomActionCreators.addRoomDescription(text));
           }}
         />
       </Item>

       <Text style = {{fontSize: 15, marginLeft: 32, marginTop: 25, color: '#87838B'}} >Category</Text>
       <Picker
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

        <Content />
        <Footer style = {{backgroundColor:'#EAE6CA', marginTop: 20}}>
        <Fab
          style={styles.fabElement}
          onPress={() => {
           Store.dispatch(roomActionCreators.addRoomOwner(Store.getState().currentUser.id));
           createRoom({ 
             variables: { 
               room: Store.getState().roomCreateParams 
             }
           })
           this.setState({formSended: true});
         }}
        >
        <Icon name="md-send" />
        </Fab>
        </Footer>
     </Container>
   )
 };

 onCreateRoom(data){
   console.log(data);
    return (
      this.props.navigation.navigate('RoomsDetail', { roomId: data.createRoom.idRoom})
    )
 };

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
         <View>
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

  titleElement: {
    margin: 20,
    color: '#0a8b88',
    alignSelf: 'center',
  },

 formElement: {
     height: 70,
     width: 300,
     alignSelf: 'center',
     marginTop: 30,
   },

  buttonStyle:{
    marginTop: 20,
    width: 100,
    alignSelf: 'center',
    backgroundColor: '#26d3cd',
  },

  fabElement: {
    backgroundColor: '#26d3cd',
  },

  pickerElement: {
    marginTop: 10,
    height: 70,
    width: 300,
    alignSelf: 'center',
  },
})
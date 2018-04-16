import React , { Component }from 'react';
import { AppRegistry, StyleSheet, View, Platform } from 'react-native';
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
import { Constants } from 'expo';
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
     <Container style={{flex:1,paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>

       <Text style={styles.titleElement}>Create Room</Text>

       <Item floatingLabel style={styles.formElement}>
       <Label style={{color:'white'}}>Room Name</Label>
         <Input style={{color:'white'}}
         onChangeText= {(text)=>{
           Store.dispatch(roomActionCreators.addRoomName(text));
         }}
         />
       </Item>

       <Item floatingLabel style={styles.formElement}>
       <Label style={{color:'white'}}>Description</Label>
         <Input style={{color:'white'}}
           onChangeText= {(text)=>{
             Store.dispatch(roomActionCreators.addRoomDescription(text));
           }}
         />
       </Item>

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

        <Button
          block
          style={styles.buttonElement}
          onPress={() => {
           Store.dispatch(roomActionCreators.addRoomOwner(Store.getState().currentUser.id));
           async function roomCreate() {
              await createRoom({ 
                variables: { 
                  room: Store.getState().roomCreateParams 
                }
              })
           }
           roomCreate().then(() => {
            this.setState({formSended: true});
           })
         }}
        >
        <Text>Create Room!</Text>
        </Button>
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
    marginTop: 50,
    color: '#0a8b88',
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },

 formElement: {
     height: 70,
     width: 300,
     alignSelf: 'center',
     marginTop: 30,
   },

  textElement:{
    color:'#87838B',
    width: 300,
    alignSelf: 'center',
    marginTop: 30,
    textAlign: "left",
  },

  pickerElement: {
    marginTop: 10,
    height: 70,
    width: 300,
    alignSelf: 'center',
    color:'white'
  },

  buttonElement:{
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
    width: 300,
    height: 50,
    backgroundColor: '#26d3cd',
    borderRadius: 8,
  },

})
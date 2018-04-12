import { combineReducers } from "redux";
import { chatMessageListReducer } from './chat/chatRedux';
import { roomCreateReducer } from "./rooms/roomsRedux";
import { roomParticipantsReducer } from "./rooms/roomsRedux";
import { sessionCreateReducer, currentUserReducer } from "./sessions/sessionsRedux";


export default combineReducers({ 
    roomCreateParams: roomCreateReducer, 
    sessionCreateParams: sessionCreateReducer, 
    chatMessageList: chatMessageListReducer, 
    currentUser: currentUserReducer,
    roomParticipants: roomParticipantsReducer,
})
import gql from 'graphql-tag';


export const ALL_ROOMS_QUERY = gql`
  query allRooms {
    allRooms {
      idRoom,
      nameRoom,
      descriptionRoom,
      owner {
        id,
        name,
        nickname,
        image
      }
    }
  }
`;

export const ROOM_BY_ID_QUERY = gql`
  query roomById($id: Int!) {
    roomById(id: $id){
      idRoom,
      nameRoom,
      descriptionRoom,
      owner {
        id,
        email,
        provider,
        name,
        nickname,
        image
      },
      Participants {
        id,
        email,
        provider,
        name,
        nickname,
        image
      }
    }
  }
`;

export const PARTICIPANTS_BY_ID_QUERY = gql`
  query participantsById($id: Int!) {
    participantsById (id: $id) {
      id
      name
      nickname
      image
    }
  }
`;

export const ROOMS_CREATE_ROOM_MUTATION = gql`
  mutation createRoom($room: CreateRoomInput!) {
    createRoom(room: $room) {
      idRoom,
      nameRoom,
      descriptionRoom,
      owner {
        id,
        name,
        nickname,
        image
      }
    }
  }
`;

export const DELETE_ROOM_MUTATION = gql`
  mutation deleteRoom($room: RoomDelete!) {
    deleteRoom(roomDelete: $room){
      idRoom,
      nameRoom
    }
  }
`;

export const JOIN_ROOM_MUTATION = gql`
  mutation joinRoom($room: JoinRoomInput!){
    joinRoom(room: $room){
      nameRoom,
      idRoom
    }
  }
`;

export const EXIT_ROOM_MUTATION = gql`
  mutation exitRoom($room: RoomDelete!){
    exitRoom(roomDelete: $room) {
      nameRoom,
      idRoom
    }
  }
`;

export const BAN_PARTICIPANT_MUTATION = gql`
  mutation banParticipant($bannedParticipant: BannedParticipant){
    banParticipant(bannedParticipant: $bannedParticipant)
  }
`;

export const PARTICIPANT_JOINED = gql`
  subscription participantJoined($roomId: Int!) {
    participantJoined(roomId: $roomId){
      id
      name
      nickname
      image
    }
  }
`;

export const ROOM_ADDED_S = gql`
  subscription roomAdded {
    roomAdded {
      idRoom,
      nameRoom,
      descriptionRoom
      owner {
        id,
        name,
        nickname,
        image
      }
    }
}
`;

export const PARTICIPANT_LEFT = gql`
  subscription participantLeft($roomId: Int! ) {
    participantLeft(roomId: $roomId){
      id
    }
}
`;
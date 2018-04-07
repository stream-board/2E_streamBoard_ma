import gql from 'graphql-tag';


export const ALL_ROOMS_QUERY = gql`
  query allRooms {
    allRooms {
      idRoom,
      nameRoom,
      owner {
        name,
        nickname
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
      idOwner,
      Participants
    }
  }
`;

export const ROOMS_CREATE_ROOM_MUTATION = gql`
  mutation createRoom($room: CreateRoomInput!) {
    createRoom(room: $room) {
      idRoom,
      nameRoom,
      owner {
        name,
        nickname
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

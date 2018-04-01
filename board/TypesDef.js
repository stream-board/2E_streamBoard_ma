import gql from 'graphql-tag';


export const BoardCreateRoomMuation = gql`
  mutation createBoardRoom($room: BoardRoomInput!) {
    createBoardRoom(room: $room) {
      id
    }
  }
`;

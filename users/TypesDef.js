import gql from 'graphql-tag';

export const UserInformationQuery = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      data
    }
  }
`;

export const ValidateSessionQuery = gql`
  query validateSession($headersSession: Headers!) {
    validateSession(headersSession: $headersSession) {
      id,
      email,
      nickname,
      name,
      token,
      client
    }
  }
`;

export const SessionCreateMutation = gql`
  mutation createSession($headersSession: Headers!) {
    createSession(headersSession: $headersSession) {
      id,
      email,
      nickname,
      name,
      token,
      client
    }
  }
`;

export const SessionDeleteMutation = gql`
  mutation deleteSession($headersSession: Headers! ) {
    deleteSession(headersSession: $headersSession){
      success
    }
  }
`;
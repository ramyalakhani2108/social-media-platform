import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginDto!) {
    login(data: $data) {
      access_token
      user {
        id
        email
        username
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($data: SignupDto!) {
    signup(data: $data) {
      access_token
      user {
        id
        email
        username
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      username
    }
  }
`;

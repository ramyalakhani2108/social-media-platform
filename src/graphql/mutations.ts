import { gql } from '@apollo/client';

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

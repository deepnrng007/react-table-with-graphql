import { gql } from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
      id
      first_name
      last_name
      age
      country
      email
      date_of_birth
      phone
    }
  }
`;
export const GET_LAUNCES = gql`
  query GetLaunches($limit: Int!, $offset: Int!) {
    launches(limit: $limit, offset: $offset) {
      mission_name
      mission_id
    }
  }
`;
export const GET_MISSIONS = gql`
  {
    missions {
      id
      mission_name
      mission_patch_small
      launch_success
      launch_date_local
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

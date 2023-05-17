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

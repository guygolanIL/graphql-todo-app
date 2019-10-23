import { gql } from "apollo-boost";

export const getTasksQuery = gql`
  {
    tasks {
      name
      description
      id
    }
  }
`;

export const getTaskQuery = gql`
  query($id: ID) {
    task(id: $id) {
      id
      name
      description
      category {
        id
        title
        details
        tasks {
          name
          id
        }
      }
    }
  }
`;

export const getCategoriesQuery = gql`
  {
    categories {
      title
      id
      details
    }
  }
`;

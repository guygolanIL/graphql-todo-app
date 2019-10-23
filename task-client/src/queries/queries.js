import { gql } from "apollo-boost";

export const getTasksQuery = gql`
  {
    tasks{
      name
      description
      id
    }
  }
`;

export const getCategoriesQuery = gql`
	{
			categories{
					title
					id
					details
			}
	}
`;

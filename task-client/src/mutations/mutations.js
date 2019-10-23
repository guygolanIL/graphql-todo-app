import {gql} from 'apollo-boost';

export const addTaskMutation = gql`
    mutation($name: String!, $description: String!, $categoryId: ID!) {
        addTask(name: $name, description: $description, categoryId: $categoryId){
            name
            description
            id
        }
    }
`;
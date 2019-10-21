const graphql = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
 } = graphql;

const TASKS = [
    {id: '1', name: 'Learn Redux', description: 'Need to improve my stack', categoryId: '1' },
    {id: '2', name: 'Learn GraphQl', description: 'Need to know it duh' , categoryId: '1'},
    {id: '3', name: 'Play Cities Skyline', description: 'Got the dudah' , categoryId: '2'},
];

const CATEGORIES = [
    {id: '1', title: 'Programming', details: 'Relates to programs'},
    {id: '2', title: 'Gaming', details: 'Games and shite'},
    {id: '3', title: 'Work', details: 'Work stuff'}
];

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => {
        return {
            id: { type: GraphQLID },
            name: {type: GraphQLString}, 
            description: {type: GraphQLString},
            category: {
                type: CategoryType,
                resolve(parent, args){
                    return CATEGORIES.find(cat => cat.id === parent.categoryId);
                }
            }
        }
    }
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => {
        return {
            id: {type: GraphQLID},
            title: {type: GraphQLString},
            details: {type: GraphQLString},
            tasks: {
                type: new GraphQLList(TaskType),
                resolve(parent, args){
                    return TASKS.filter(task => task.categoryId === parent.id);
                }
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {id: {type: GraphQLID } },
            resolve(parent, args){
                return TASKS.find( task => task.id === args.id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args){
                return TASKS;
            }
        },
        category: {
            type: CategoryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return CATEGORIES.find(category => category.id === args.id);
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return CATEGORIES;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
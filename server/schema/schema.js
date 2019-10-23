const graphql = require('graphql');
const TaskModel = require('../dbmodels/task');
const CategoryModel = require('../dbmodels/category');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
 } = graphql;


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
                    return CategoryModel.findById(parent.categoryId);
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
                    return TaskModel.find({ categoryId: parent.id });
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
                return TaskModel.findById(args.id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args){
                return TaskModel.find({});
            }
        },
        category: {
            type: CategoryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return CategoryModel.findById(args.id);
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return CategoryModel.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: {type: new GraphQLNonNull(GraphQLString) },
                categoryId: {type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const task = new TaskModel({
                    name: args.name,
                    description: args.description,
                    categoryId: args.categoryId
                });
                return task.save();
            }
        },
        addCategory: {
            type: CategoryType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                details: {type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const category = new CategoryModel({
                    title: args.title,
                    details: args.details
                });
               return category.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

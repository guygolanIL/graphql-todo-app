import React from 'react';
import { graphql } from "react-apollo";
import { getTasksQuery } from '../queries/queries';

class TaskList extends React.Component {
  
  render(){
    return (
      <div>
        <ul id="task-list">
            {this.getTasksListItems()}
        </ul>
      </div>
    );
  }


  getTasksListItems(){
    const fetchedData = this.props.data;
    if(fetchedData.loading){
      return <div>Loading Tasks...</div>;
    } else {
      if(fetchedData.tasks){
        const tasks = fetchedData.tasks;
        return tasks.map(task => <li key={task.id}>{`name: ${task.name} description: ${task.description}`}</li>);
      }
    }
  }
}

export default graphql(getTasksQuery)(TaskList);

import React from "react";
import { graphql } from "react-apollo";
import { getTasksQuery } from "../queries/queries";

//components
import TaskDetails from "./TaskDetails";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  render() {
    return (
      <div>
        <ul id="task-list">{this.getTasksListItems()}</ul>
        <TaskDetails taskId={this.state.selected}/>
      </div>
    );
  }

  getTasksListItems() {
    const fetchedData = this.props.data;
    if (fetchedData.loading) {
      return <div>Loading Tasks...</div>;
    } else {
      if (fetchedData.tasks) {
        const tasks = fetchedData.tasks;
        return tasks.map(task => (
          <li
            key={task.id}
            onClick={e => this.setState({ selected: task.id })}
          >{task.name}</li>
        ));
      }
    }
  }
}

export default graphql(getTasksQuery)(TaskList);

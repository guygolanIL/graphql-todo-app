import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getTaskQuery } from "../queries/queries";

class TaskDetails extends Component {
  render() {
    return <div id="task-details">{this.displayTaskDetails()}</div>;
  }

  displayTaskDetails() {
    const { task } = this.props.data;
    if (task) {
      return (
        <div>
          <h2>{task.name}</h2>
          <p> {task.description} </p>
          <p> {task.category.title} </p>
          <p>All Other Tasks in this category</p>
          <ul className="other-books">
            {task.category.tasks.map(task => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No Task Selected...</div>;
    }
  }
}

export default graphql(getTaskQuery, {
  options: props => {
    return {
      variables: {
        id: props.taskId
      }
    };
  }
})(TaskDetails);

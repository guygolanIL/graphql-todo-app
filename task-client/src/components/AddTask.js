import React from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getCategoriesQuery, getTasksQuery } from "../queries/queries";
import { addTaskMutation } from "../mutations/mutations";


class AddTask extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      categoryId: ''
    };
  }

	getCategoriesOptions(){
    const fetchedData = this.props.getCategoriesQuery;
		if(fetchedData.loading){
			return <option disabled>Loading Categories...</option>;
		} else {
			if(fetchedData.categories){
				return fetchedData.categories.map(category => <option value={category.id} key={category.id}>{category.title}</option>);
			}
		}
	}

  submitForm = (e) => {
    e.preventDefault();
    this.props.addTaskMutation({
      variables: {
        name: this.state.name,
        description: this.state.description,
        categoryId: this.state.categoryId
      },
      refetchQueries: [{ query: getTasksQuery }]
    });
  }

	render(){
			return (
					<form id="add-task-form" onSubmit={ this.submitForm }>
						<div className="field">
							<label>Task name:</label>
							<input type="text" onChange={ (e) => this.setState({name: e.target.value}) }/>
						</div>

						<div className="field">
							<label>Task Description:</label>
							<input type="text" onChange={ (e) => this.setState({description: e.target.value}) }/>
						</div>

						<div className="field">
							<label>Category</label>
							<select onChange={ (e) => this.setState({categoryId: e.target.value}) }>
								<option>Select category</option>
								{this.getCategoriesOptions()}
							</select>
						</div>

						<button>+</button>
					</form>
				);
	}
}

export default compose(
  graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
  graphql(addTaskMutation, {name: "addTaskMutation"})
)(AddTask);

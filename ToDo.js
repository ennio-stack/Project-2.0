import React from "react";
class ToDo extends React.Component{
    render(){
        const { task } = this.props;
        return (
          <div>
            <h3>{task.name}</h3>
            <p>ID: {task.id}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
          </div>
        );
    }
}
export default ToDo
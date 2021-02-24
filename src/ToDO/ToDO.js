import React from "react";

class ToDo extends React.Component{
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
        inputValue: ''
    }

    handleChange = (event) => {

        const {value} = event.target;
        this.setState({
            inputValue: value
        })
    }

    handleSubmit = (event) => {
        const tsk = [...this.state.tasks]
        tsk.push(this.state.inputValue);
        this.setState({
            tasks: tsk,
            inputValue: ''
        })
       
    }

    render(){
        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <p key={index}>{task}</p>
            )
        })
        return(
            <div className="ToDo">
               <h1> ToDo Component </h1>
               <div>
                   <input 
                   placeholder="Add Task" 
                   type="text" 
                   onChange={this.handleChange} 
                   value={this.state.inputValue}
                   />
                   <button onClick={this.handleSubmit}>Add Task</button>
               </div>
               <div className="tasks">
                    {Tasks}
               </div>
            </div>
        )
    }
}

export default ToDo;
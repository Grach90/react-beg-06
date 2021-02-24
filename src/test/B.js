import React from "react";

class B extends React.Component{
    state = {
        inputValue: ''
    }

    handleChange = (event) => {

        const {value} = event.target;
        this.setState({
            inputValue: value
        })
    }

    handleSubmit = (event) => {
        const {handleSub} = this.props;
        handleSub(this.state.inputValue);
    }

    render(){
        return(
            <div>
                <h1>B Component</h1>
                <div>
               <div>
                   <input 
                   placeholder="Add Task" 
                   type="text" 
                   onChange={this.handleChange} 
                   value={this.state.inputValue} 
                   />
                   <button onClick={this.handleSubmit}>Add Task</button>
               </div>
            </div>
            </div>
            
        )
    }
}

export default B;
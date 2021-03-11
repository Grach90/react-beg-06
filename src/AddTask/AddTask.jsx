import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

class AddTasks extends React.PureComponent {
    state = {
        inputValue: ""
    };

    handleChange = (e) => {
        let inputValue = e.target.value;
        this.setState({
            inputValue
        })
    };
    passValue = () => {
        let {inputValue} = this.state;
        if(inputValue === "")
        return;
        this.props.getValueAddTask(inputValue);
        inputValue= "";
        this.setState({
            inputValue
        })
    };
    
    render() {
        const {isEmptyMarkedTasks} = this.props;
        return (
            <div>
                <InputGroup className="mt-5 mb-5">
                    <Form.Control 
                    type="text" 
                    placeholder="Task Name"
                    onChange={this.handleChange}
                    value= {this.state.inputValue}
                    disabled={isEmptyMarkedTasks}
                    />
                    <Button 
                    className="ml-3"
                    onClick={this.passValue}
                    disabled={isEmptyMarkedTasks}
                    >
                    Add
                    </Button>
                </InputGroup>
            </div>
        )
    }
}

export default AddTasks;
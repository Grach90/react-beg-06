import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import withScreenSizes from "../HOC/withScreenSizes";
import PropTypes from 'prop-types';

class AddTask extends React.PureComponent {
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
                    onKeyPress={({key}) => key === "Enter" ? this.passValue() : ""}
                    />
                    <Button 
                    className="ml-3"
                    onClick={this.passValue}
                    disabled={isEmptyMarkedTasks}
                    >
                    Add
                    </Button>
                    <p>{this.props.width}</p>
                </InputGroup>
            </div>
        )
    }
};
AddTask.propTypes = {
    passValue: PropTypes.func, 
    isEmptyMarkedTasks: PropTypes.bool,
    inputValue: PropTypes.string
}
export default withScreenSizes(AddTask);
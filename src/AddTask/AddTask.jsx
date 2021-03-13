import React, {createRef} from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import withScreenSizes from "../HOC/withScreenSizes";
import PropTypes from 'prop-types';
import style from "./AddTask.module.css";

class AddTask extends React.PureComponent {
    constructor(props){
        super(props)
        this.inputRef = createRef();
        this.state = {
            title: "",
            discription: ""
        };
    }
    

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    };
    passValue = () => {
        let {title, discription} = this.state;
        if(title === "" || discription === "")
        return;
        this.props.getValueAddTask(title, discription);
        discription= "";
        title= "";
        this.setState({
            title,
            discription
        })
    };
    componentDidMount(){
        this.inputRef.current.focus();
    }
    render() {
        const {isEmptyMarkedTasks} = this.props;
        return (
            <div>
                <InputGroup className="mt-5 mb-3">
                    <Form.Control 
                    name= "title"
                    type="text" 
                    placeholder="Task Name"
                    onChange={this.handleChange}
                    value= {this.state.title}
                    disabled={isEmptyMarkedTasks}
                    onKeyPress={({key}) => key === "Enter" ? this.passValue() : ""}
                    ref={this.inputRef}
                    />
                    <Button 
                    className="ml-3"
                    onClick={this.passValue}
                    disabled={isEmptyMarkedTasks}
                    >
                    Add
                    </Button>
                </InputGroup>
                <InputGroup>
                <Form.Control
                    name= "discription" 
                    as="textarea" 
                    placeholder="discription"
                    className={style.textarea}
                    value= {this.state.discription}
                    onChange={this.handleChange}
                    disabled={isEmptyMarkedTasks}
                    
                    />
                </InputGroup>
            </div>
        )
    }
};
AddTask.propTypes = {
    getValueAddTask: PropTypes.func.isRequired, 
    isEmptyMarkedTasks: PropTypes.bool.isRequired
}
export default withScreenSizes(AddTask);
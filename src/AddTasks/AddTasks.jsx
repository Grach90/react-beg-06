
import React from "react";
import {Form, Button} from "react-bootstrap";

class AddTasks extends React.PureComponent {
    render(){
        return (
            <div style={{margin: "10px"}}>
                <Form.Group>
                <Form.Control style={{width: "80%"}} type="text" placeholder="Tasks Name" />
                <Button>
                    Add
                </Button>
                </Form.Group>
            </div>
        )
    }
}

export default AddTasks;
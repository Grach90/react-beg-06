import React from "react";
import random from "../helpers/Random";
import {Container, Row} from "react-bootstrap";
import style from "./ToDo.module.css";
import Task from "../Task/Task";
import AddTasks from "../AddTasks/AddTasks";

class ToDo extends React.PureComponent {
    state = {
        tasks: [
            {
              name: "Task1",
              _id: random()
            },  
            {
              name: "Task2",
              _id: random()
            },  
            {
              name: "Task3",
              _id: random()
            },],


    }

    render(){
            const tasks = this.state.tasks.map(task => {
              return (  <Task 
                            key={task._id} 
                            task= {task}
                        />
                        
              )
            })
        return(
            <div>
                <Container>
                    <Row>
                        <AddTasks />
                    </Row>
                    <Row className= {style.taskRow}>
                        {tasks}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ToDo;
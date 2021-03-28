import React from "react";
import {Form, Button} from "react-bootstrap";
import style from "./contact.module.css";
import {withRouter} from "react-router-dom";
import Spiner from "../Spiner/Spiner";

const inputs = [
  {
    name:"name",
    placeholder:"Name",
    type:"text"
  },
  {
    name:"email",
    placeholder:"Email",
    type:"email"
  },
  {
    name:"message",
    placeholder:"Message",
    type: "",
    rows: 4,
    as:"textarea"
  }
]

class ContactForm extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    loading:false
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
        [name]: value 
    });
  }
  handleSubMit = () => {
    let formData = {...this.state};
    delete formData.loading;
    this.setState({loading: true});
    fetch("http://localhost:3001/form", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type":"application/json"
      }
    })
    .then(respons => respons.json())
    .then(data => {
      if(data.error) throw data.error;
      this.props.history.replace("/");
    })
    .catch(error => {
      console.log("Error", error);
      this.setState({loading: false});
    });
  }

  render(){
    const inputsJSX = inputs.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Control
            name={input.name} 
            type={input.type} 
            placeholder={input.placeholder}
            onChange={this.handleChange}
            value={this.state[input.name]}
            rows={input.rows || undefined}
            as={input.as || undefined}
          />
        </Form.Group>
      )
    })
    return (
      <>
        <Form className ={style.form} onSubmit={(e) => e.preventDefault()}>
          {inputsJSX}
          <Button variant="primary" type="submit" onClick={this.handleSubMit}>
            Save
          </Button>
        </Form>
        {this.state.loading && <Spiner />}
      </>
    )
  }
}

export default withRouter(ContactForm);
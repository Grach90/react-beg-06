import React from "react";
import {Form, Button} from "react-bootstrap";
import style from "./contact.module.css";
import {withRouter} from "react-router-dom";
import Spiner from "../Spiner/Spiner";
import {isRequired, maxLength, minLength, validetEmail} from '../../helpers/Validate';

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
const maxLength30 = maxLength(30);
const minLength6 = minLength(6);
class ContactForm extends React.Component {
  state = {
    formData: {
      name: {
        value:"",
        error:"",
        valid:false
      },
      email: {
        value:"",
        error:"",
        valid:false
      },
      message: {
        value:"",
        error:"",
        valid:false
      }
    },  
    loading:false,
    errorMessage:""
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    const {formData} = this.state;
    let error = isRequired(value) || maxLength30(value) || 
                minLength6(value) || 
                (name === "email" && validetEmail(value));
    if(!error) formData[name].valid = true; 
    else formData[name].valid = false;
    formData[name].value = value;
    formData[name].error = error;
    this.setState({
        formData
    });
  }

  handleSubMit = () => {
    let formDataObj = {...this.state.formData};
    let formData = {};
    let valid;
    for(let key in formDataObj){
      formData[key] = formDataObj[key].value;
      if(formDataObj[key].valid === false) valid = false;
      else valid = true;
    }
    
    if(!valid) return;
    this.setState({loading: true, errorMessage: ""});
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
      this.setState({loading: false, errorMessage: error.message});
    });
  }

  render(){
    let valid = false;
    for(let key in this.state.formData){
      if(this.state.formData[key].valid === false)
      valid = true;
    }
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
          <Form.Text className={style.formText}>{this.state.formData[input.name].error}</Form.Text>
        </Form.Group>
      )
    })
  
    return (
      <>
        <h4 className={style.errorMessage}>{this.state.errorMessage}</h4>
        <Form className ={style.form} onSubmit={(e) => e.preventDefault()} >
          {inputsJSX}
          <Button 
            variant="primary" 
            type="submit" 
            onClick={this.handleSubMit}
            disabled={valid}
          >
            Save
          </Button>
        </Form>
        {this.state.loading && <Spiner />}
      </>
    )
  }
}

export default withRouter(ContactForm);
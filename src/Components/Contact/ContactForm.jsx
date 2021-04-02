import React, {useState} from "react";
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
];
const maxLength30 = maxLength(30);
const minLength6 = minLength(6);

const ContactForm = (props) => {
  const [state, setState] = useState({
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
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    const {formData} = state;
    let error = isRequired(value) || maxLength30(value) || 
                minLength6(value) || 
                (name === "email" && validetEmail(value));
    if(!error) formData[name].valid = true; 
    else formData[name].valid = false;
    formData[name].value = value;
    formData[name].error = error;
    setState({
      ...state,
      formData
    });
  };

  const handleSubMit = () => {
    let formDataObj = {...state.formData};
    let formData = {};
    let valid;
    for(let key in formDataObj){
      formData[key] = formDataObj[key].value;
      if(formDataObj[key].valid === false) valid = false;
      else valid = true;
    }
    
    if(!valid) return;
    setState({...state, loading: true, errorMessage: ""});
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
      props.history.replace("/");
    })
    .catch(error => {
      console.log("Error", error);
      setState({...state, loading: false, errorMessage: error.message});
    });
  };

    let valid = false;
    for(let key in state.formData){
      if(state.formData[key].valid === false)
      valid = true;
    }
    const inputsJSX = inputs.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Control
            name={input.name} 
            type={input.type} 
            placeholder={input.placeholder}
            onChange={handleChange}
            value={state[input.name]}
            rows={input.rows || undefined}
            as={input.as || undefined}
          />
          <Form.Text className={style.formText}> {state.formData[input.name].error} </Form.Text>
        </Form.Group>
      )
    });
  
    return (
      <>
        <h4 className={style.errorMessage}>{state.errorMessage}</h4>
        <Form className ={style.form} onSubmit={(e) => e.preventDefault()} >
          {inputsJSX}
          <Button 
            variant="primary" 
            type="submit" 
            onClick={handleSubMit}
            disabled={valid}
          >
            Save
          </Button>
        </Form>
        {state.loading && <Spiner />}
      </>
    )
};

export default withRouter(ContactForm);
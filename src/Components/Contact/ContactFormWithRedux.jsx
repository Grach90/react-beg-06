import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {Form, Button} from "react-bootstrap";
import style from "./contact.module.css";
import {withRouter} from "react-router-dom";
import Spiner from "../Spiner/Spiner";
import types from '../../Redux/actionTypes';
import {subMitThunk} from '../../Redux/action';


let inputs = [
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

const ContactFormWithRedux = (props) => {
  let { state: {
    formData,
    loading
    },
    change,
    handleSubMit,
    resetState
  } = props;

    let valid = false;
    for(let key in formData){
      if(formData[key].valid === false)
      valid = true;
    }
    const inputsJSX = inputs.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Control
            name={input.name} 
            type={input.type} 
            placeholder={input.placeholder}
            onChange={change}
            value={formData[input.name].value}
            rows={input.rows || undefined}
            as={input.as || undefined}
          />
          <Form.Text className={style.formText}> {formData[input.name].error} </Form.Text>
        </Form.Group>
      )
    });

    useEffect(() => {
      return () => {
        resetState();
      }
    }, []);
  
    return (
      <>
        <Form className ={style.form} onSubmit={(e) => e.preventDefault()} >
          {inputsJSX}
          <Button 
            variant="primary" 
            type="submit" 
            onClick={() => handleSubMit(formData, props.history)}
            disabled={valid}
          >
            Save
          </Button>
        </Form>
        {loading && <Spiner />}
      </>
    )
};

const mapStateToProps = (state) => {
  return {
    state: {...state.contactFormState, ...state.globalState}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    change: (e) => dispatch({type: types.HANDLE_CHANGE, e}),
    handleSubMit: (formData, history) => {
      dispatch((dispatch) => subMitThunk(dispatch, formData, history));
    },
    resetState: () => dispatch({type: types.RESET_CONTACTFORM_STATE})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactFormWithRedux));
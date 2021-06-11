import style from './register.module.css';
import Zoom from 'react-reveal/Bounce';
import { Form, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import types from '../../Redux/actionTypes';
import {registerThunk} from '../../Redux/action';


const inputs = [
  {
    name: 'name',
    placeholder: 'First Name',
    type: 'text'
  },
  {
    name: 'surname',
    placeholder: 'Last Name',
    type: 'text'
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email'
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password'
  },
  {
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    type: 'password'
  }
]
const Register = (props) => {

  const {handleChange, formData, handleSubMit} = props;

  let valid = false;
  for(let item in formData){
    if(formData[item].valid) 
    valid = true; 
  }
  
  const inputsJSX = inputs.map((input, index) => {
    return (
      <Form.Group key={index}>
        <Form.Control 
          name={input.name}
          placeholder={input.placeholder}
          type={input.type}
          onChange={(e) => handleChange(e)}
          value={formData[input.name].value}
        />
        <Form.Text style={{color:'red'}}>{formData[input.name].error}</Form.Text>
      </Form.Group>
    )
  })

  return (
    <div className={style.main}>
     <h1 className={style.reveal}>
          <Zoom left cascade >
            R E G I S T E R
          </Zoom>
        </h1>
        <Form className ={style.form} onSubmit={(e) => e.preventDefault()} >
          {inputsJSX}
          <Button 
            className={style.button} 
            type="submit" 
            onClick={() => handleSubMit(formData, props.history)}
            disabled={valid}
          >
            REGISTER
          </Button>
        </Form>
        {/* {loading && <Spiner />} */}
    </div>
  )
}

const mapStateToProps = (state) => {
  
  return {
    formData: {...state.registerState.formData}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => dispatch({type: types.HANDLE_CHANGE_REGISTER, e}),
    handleSubMit: (formData, history) => {
      dispatch((dispatch) => registerThunk(dispatch, formData, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
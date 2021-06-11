import { Form, Button } from 'react-bootstrap';
import style from './login.module.css';
import Zoom from 'react-reveal/Bounce';
import {connect} from 'react-redux';
import types from '../../Redux/actionTypes';
import {validetEmail, minLength} from '../../helpers/Validate';
import { loginThunk } from '../../Redux/action';

const minLength6 = minLength(6);

const Login = ({handleChange, handleSubmit, formData, history}) => {
  
  const emailError = formData.email && validetEmail(formData.email);
  const passwordError = formData.password && minLength6(formData.password);
  const valid = !!!passwordError && !!!emailError ? false : true;

  return (
    <div className={style.main}>
      <h1 className={style.reveal}>
          <Zoom left cascade >
            L O G I N
          </Zoom>
      </h1>
      <Form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Control 
            name='email'
            placeholder='Email'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          <Form.Text style={{color:'red'}}>{emailError}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Control 
            name='password'
            placeholder='Password'
            type='password'
            onChange={(e) => handleChange(e)}
          />
          <Form.Text style={{color:'red'}}>{passwordError}</Form.Text>
        </Form.Group>
        <Button
          onClick={() => handleSubmit(formData, history)}
          disabled={valid}
        >
          Login
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    formData: {...state.loginState.formData}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => dispatch({type: types.ONCHANGE_LOGIN, e}),
    handleSubmit: (formData, history) => {
      dispatch((dispatch) => loginThunk(dispatch, formData, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
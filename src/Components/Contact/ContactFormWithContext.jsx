import {useContext} from 'react';
import {contactContext} from '../../Context/Context';
import {Form, Button} from "react-bootstrap";
import style from "./contact.module.css";
import Spiner from "../Spiner/Spiner";

const ContactFormWithContext = () => {
  const context = useContext(contactContext);
  const {
    inputsJSX,
    valid,
    handleSubMit,
    loadingErr
  } = context;
  const {errorMessage, loading} = loadingErr;
  return (
    <>
      <h4 className={style.errorMessage}>{errorMessage}</h4>
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
      {loading && <Spiner />}
    </>
  )
}

export default ContactFormWithContext;
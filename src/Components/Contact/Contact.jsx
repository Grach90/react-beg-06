import style from "./contact.module.css";
import ContactFormWithRedux from './ContactFormWithRedux';

function Contact(props){
  return (
    <div className={style.body}>
      <h1>Contact Form</h1>
      <ContactFormWithRedux />
    </div>
  )
}

export default Contact;
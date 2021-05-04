import style from "./contact.module.css";
import ContactFormWithRedux from './ContactFormWithRedux';

function Contact(){
  return (
    <div className={style.main}>
      <ContactFormWithRedux />
    </div>
  )
}

export default Contact;
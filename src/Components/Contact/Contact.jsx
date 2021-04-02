import ContactForm from "./ContactForm";
import style from "./contact.module.css";

function Contact(){
  return (
    <div className={style.body}>
      <h1>Contact Form</h1>
      <ContactForm />
    </div>
  )
}

export default Contact;
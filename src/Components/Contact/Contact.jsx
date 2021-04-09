import ContactForm from "./ContactForm";
import style from "./contact.module.css";
import ContactFormProvider from '../../Context/Providers/ContactFormProvider';
import ContactFormWithContext from './ContactFormWithContext';

function Contact(props){
  return (
    <div className={style.body}>
      <h1>Contact Form</h1>
      <ContactFormProvider>
        <ContactFormWithContext/>
      </ContactFormProvider>
      {/* <ContactForm /> */}
    </div>
  )
}

export default Contact;
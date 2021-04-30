// import ContactForm from "./ContactForm";
// import style from "./contact.module.css";
// import ContactFormProvider from '../../Context/Providers/ContactFormProvider';
// import ContactFormWithContext from './ContactFormWithContext';
import ContactFormWithRedux from './ContactFormWithRedux';

function Contact(props){
  return (
    <div >
      <h1>Contact Form</h1>
      <ContactFormWithRedux />
      {/* <ContactFormProvider>
        <ContactFormWithContext/>
      </ContactFormProvider> */}
      {/* <ContactForm /> */}
    </div>
  )
}

export default Contact;
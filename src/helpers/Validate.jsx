export const isRequired = (value) => value.length < 2 ? "is Required" : undefined;
export const maxLength = (length) => (value) => value.length > length ? "maximum length exceeded" : undefined;
export const minLength = (length) => (value) => value.length < length ? "minimum length must be " + length : undefined;
export const validetEmail = (email) => { 
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) ? undefined : "Invalid Email";
}
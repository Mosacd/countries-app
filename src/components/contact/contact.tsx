import React, { ChangeEvent, useState } from 'react';
import styles from './contact.module.css';

const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [formError, setFormError] = useState(''); 

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFirstName(value);
    if (value.length < 2) {
      setErrors((prev) => ({ ...prev, firstName: 'First name should be at least 2 characters long' }));
    } else {
      setErrors((prev) => ({ ...prev, firstName: '' }));
    }
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setLastName(value);
    if (value.length < 4) {
      setErrors((prev) => ({ ...prev, lastName: 'Last name should be at least 4 characters long' }));
    } else {
      setErrors((prev) => ({ ...prev, lastName: '' }));
    }
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  }

  function handleMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setMessage(value);
    if (value.length < 10) {
      setErrors((prev) => ({ ...prev, message: 'Message should be at least 10 characters long' }));
    } else {
      setErrors((prev) => ({ ...prev, message: '' }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    
    if (!firstName || !lastName || !email || !message) {
      setFormError('All fields must be filled out.');
      return;
    }

    
    if (errors.firstName || errors.lastName || errors.email || errors.message) {
      setFormError('Please fix the errors in the form before submitting.');
      return;
    }

    setFormError('');

    
    const formData = { firstName, lastName, email, message };
    console.log('Submitted Form Data:', formData);
  }

  
  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className={styles.outerdiv}>
      <div className={styles.intro}>
        <h1>Contact Us</h1>
        <p>Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form1} onKeyDown={handleKeyDown} noValidate>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          autoComplete="off"
          className={styles.inputs}
        />
        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          autoComplete="off"
          className={styles.inputs}
        />
        {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
          className={styles.inputs}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          rows={10}
          cols={30}
          value={message}
          onChange={handleMessageChange}
          autoComplete="off"
          className={styles.textarea}
        />
        {errors.message && <p className={styles.error}>{errors.message}</p>}

        <input className={styles.submit} type="submit" value="Send" />

        {/* Display form-level error below the submit button */}
        {formError && <p className={styles.error}>{formError}</p>}
      </form>
    </div>
  );
};

export default Contact;

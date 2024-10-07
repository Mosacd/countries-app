import React from 'react';
import styles from './contact.module.css';

const Contact: React.FC = () => {

/*
ramdenadac vxvdebi custom validation-is dawera araa sachiro, amito enteris 
dacherisas emailis swor formats da shevsebul velebs ar gatestavs.
barem formasac noValidate-s mivcem
*/

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      message: form.message.value,
    };

    console.log('Submitted Form Data:', formData);
  }


  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      const form = e.currentTarget;
      handleSubmit({ target: form, preventDefault: () => {} } as unknown as React.FormEvent<HTMLFormElement>);
    }
  }

  return (
    <div className={styles.outerdiv}>
      <div className={styles.intro}>
        <h1>Contact Us</h1>
        <p>
          Got a question? We'd love to hear from you.
          Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form1} onKeyDown={handleKeyDown} noValidate>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          
          autoComplete="off"
          className={styles.inputs}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          
          autoComplete="off"
          className={styles.inputs}
        />

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          className={styles.inputs}
          
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          rows={10}
          cols={30}
          autoComplete="off"
          className={styles.textarea}
        />

        <input className={styles.submit} type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Contact;

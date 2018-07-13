import React from 'react'

class ContactForm extends React.Component {
  render() {
    return (
      <form name="contact" method="POST" data-netlify="true">
        <div className="field">
          <label className="label">Your Name:</label>
          <div className="control">
            <input className="input" type="text" name="name" autoComplete="name" required/>
          </div>
        </div>
        <div className="field">
          <label className="label">Your Email:</label>
          <div className="control">
            <input className="input" type="email" name="email" autoComplete="email" required/>
          </div>
        </div>
        <div className="field">
          <label className="label">Message:</label>
          <div className="control">
            <textarea className="textarea" name="message" />
          </div>
        </div>
        <div data-netlify-recaptcha></div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">Send</button>
          </div>
        </div>
      </form>
    )
  }
}

export default ContactForm

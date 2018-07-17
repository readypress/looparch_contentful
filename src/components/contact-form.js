import React from 'react'
import { navigateTo } from 'gatsby-link'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    const form = e.target

    e.preventDefault()
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => {
        console.log('got here')
        navigateTo(form.getAttribute('action'))
      })
      .catch(error => console.log(error))
  }

  render() {
    const sectionName = this.props.section || 'Contact Us'

    return (
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        action="/thanks"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <div className="field">
          <label className="label">Your Name:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              autoComplete="name"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Your Email:</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Message:</label>
          <div className="control">
            <textarea
              className="textarea"
              name="message"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div data-netlify-recaptcha />
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">
              Send
            </button>
          </div>
        </div>
        <input
          type="hidden"
          name="section"
          value={sectionName}
          onChange={this.handleChange}
        />
        <input type="hidden" name="bot-field" onChange={this.handleChange} />
      </form>
    )
  }
}

export default ContactForm

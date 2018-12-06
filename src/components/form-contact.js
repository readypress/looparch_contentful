import React from 'react'
import { navigate } from 'gatsby'
import Recaptcha from 'react-google-recaptcha'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class FormContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      manufacturer: this.props.section || 'Contact Us',
      message: '',
      'g-recaptcha-response': null,
    }
  }

  componentDidMount() {
    this.setState({
      manufacturer: this.props.section || 'Contact Us',
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRecaptcha = value => {
    this.setState({ 'g-recaptcha-response': value })
    document.getElementById('recapchta-message').classList.add('is-hidden')
  }

  handleSubmit = e => {
    const form = e.target

    e.preventDefault()

    if (!this.state['g-recaptcha-response']) {
      return document
        .getElementById('recapchta-message')
        .classList.remove('is-hidden')
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => {
        navigate(form.getAttribute('action'))
      })
      .catch(error => console.log(error))
  }

  render() {
    const sectionName = this.props.section || 'Contact Us'
    const manufacturers = this.props.manufacturers.edges
    const recaptchaKey = this.props.recaptchaKey

    return (
      <form
        name="contact"
        method="POST"
        action="/thanks"
        data-netlify="true"
        data-netlify-recaptcha="true"
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
          <label className="label">Manufacturer:</label>
          <div className="control">
            <span className="select">
              <select
                name="manufacturer"
                defaultValue={sectionName}
                onChange={this.handleChange}
              >
                {manufacturers.map(({ node }) => {
                  return (
                    <option key={node.id} value={node.title}>
                      {node.title}
                    </option>
                  )
                })}
              </select>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Message:</label>
          <div className="control">
            <textarea
              className="textarea"
              name="message"
              onChange={this.handleChange}
              placeholder={`I have a question about ${sectionName}...`}
            />
          </div>
        </div>
        <div className="field">
          <Recaptcha
            ref="recaptcha"
            sitekey={recaptchaKey}
            onChange={this.handleRecaptcha}
            required
          />
          <div
            className="is-hidden is-inline-block notification is-danger"
            id="recapchta-message"
          >
            Recaptcha is required.
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">
              Send
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default FormContact

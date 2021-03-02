import React from 'react'
import { navigate } from 'gatsby'
import Recaptcha from 'react-google-recaptcha'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRecaptcha = (value) => {
    this.setState({ 'g-recaptcha-response': value })
    document.getElementById('recapchta-message').classList.add('is-hidden')
  }

  handleSubmit = (e) => {
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
      .catch((error) => console.log(error))
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
          <label className="label" htmlFor="name">
            Your Name:
          </label>
          <div className="control">
            <input
              id="name"
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
          <label className="label" htmlFor="email">
            Your Email:
          </label>
          <div className="control">
            <input
              id="email"
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
          <label className="label" htmlFor="manufacturer">
            Manufacturer:
          </label>
          <div className="control">
            <span className="select">
              <select
                id="manufacturer"
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
          <label className="label" htmlFor="message">
            Message:
          </label>
          <div className="control">
            <textarea
              id="message"
              className="textarea"
              name="message"
              onChange={this.handleChange}
              placeholder={`Your message...`}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="project_name">
            Project Name (if applicable):
          </label>
          <div className="control">
            <input
              id="project_name"
              className="input"
              type="text"
              name="project_name"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="project_specifier">
            Project Specifier (if applicable):
          </label>
          <div className="control">
            <input
              id="project_specifier"
              className="input"
              type="text"
              name="project_specifier"
              onChange={this.handleChange}
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

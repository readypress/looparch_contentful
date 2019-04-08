import React from 'react'

class FormSignup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div id="mc_embed_signup">
        <form
          action="https://looparch.us18.list-manage.com/subscribe/post?u=6236ae131b11b8506326eed86&amp;id=a7bb0e0ce6"
          method="POST"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <h2 className="title is-size-5">Subscribe to our mailing list</h2>
            <div className="field">
              <label className="label is-sr-only" htmlFor="mce-EMAIL">
                Email Address <span className="asterisk">*</span>
              </label>
              <div className="control">
                <input
                  type="email"
                  name="EMAIL"
                  className="required email input"
                  id="mce-EMAIL"
                  autoComplete="email"
                  placeholder="Email Address*"
                />
              </div>
            </div>
            <div className="field">
              <label className="label is-sr-only" htmlFor="mce-FNAME">
                First Name
              </label>
              <div className="control">
                <input
                  type="text"
                  name="FNAME"
                  className="input"
                  id="mce-FNAME"
                  autoComplete="given-name"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label is-sr-only" htmlFor="mce-LNAME">
                  Last Name
                </label>
                <input
                  type="text"
                  name="LNAME"
                  className="input"
                  id="mce-LNAME"
                  autoComplete="family-name"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" />
              <div className="response" id="mce-success-response" />
            </div>
            <div aria-hidden="true" className="is-hidden">
              <input
                type="text"
                name="b_6236ae131b11b8506326eed86_a7bb0e0ce6"
                tabIndex="-1"
                defaultValue=""
              />
            </div>
            <div className="clear">
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button is-primary"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default FormSignup

import React, { Component } from 'react'
import { Link } from 'gatsby'
import queryString from 'querystring'

import styles from './search.sass'

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  componentDidMount() {
    if (this.props.search) {
      const el = document.getElementById('searchTerm')
      const searchTerm = queryString.parse(this.props.search)[`?s`]
      this.search({
        target: {
          value: searchTerm,
        },
      })
    }
  }

  render() {
    return (
      <section>
        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input is-large"
              type="text"
              value={this.state.query}
              onChange={this.search}
              id="searchTerm"
              autoFocus
            />
            <span className="icon is-medium is-left">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="svg-inline--fa fa-search fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={{
                  position: 'absolute',
                  maxWidth: '1.5rem',
                  maxHeight: '1.5rem',
                }}
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
        {this.state.results.map((result) => {
          let manufacturer
          let title = result.title
          let baseLink

          switch (result.type) {
            case 'ContentfulManufacturer':
              baseLink = `/manufacturers/${result.slug}`
              break
            case 'ContentfulBlogPost':
              baseLink = `/articles/${result.slug}`
              break
            case 'MarkdownRemark':
              baseLink = `${result.slug}`
              break
            default:
              baseLink = ''
          }
          return (
            <div key={result.id} className="search-result">
              <Link to={`${baseLink}`}>
                <h3 className="is-inline-block subtitle is-size-5">{title}</h3>
              </Link>
              <div
                className="tags is-inline-block"
                css={{
                  marginLeft: '10px',
                }}
              >
                {result.tags.map((tag, i) => {
                  return (
                    <div className="tag" key={i}>
                      {tag}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    )
  }

  getSearchResults(query) {
    if (!query || !window.__LUNR__) return []
    const lunrIndex = window.__LUNR__[this.props.lng]
    const results = lunrIndex.index.search(query)
    return results.map(({ ref }) => lunrIndex.store[ref])
  }

  search = (event) => {
    const query = event.target.value
    const results = this.getSearchResults(query)
    this.setState((s) => {
      return {
        results,
        query,
      }
    })
  }
}

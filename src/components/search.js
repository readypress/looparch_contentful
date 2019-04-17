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
              <i className="fas fa-search fa-lg" />
            </span>
          </div>
        </div>
        {this.state.results.map(result => {
          let manufacturer
          let title = result.title
          let baseLink

          switch (result.type) {
            case 'ContentfulManufacturer':
              baseLink = `/manufacturers/${result.slug}`
              break
            case 'ContentfulProduct':
              manufacturer = this.props.data.allContentfulManufacturer.edges.filter(
                edge => {
                  return edge.node.id === result.manufacturer
                }
              )[0].node
              title = `${manufacturer.title} - ${result.title}`
              baseLink = `/manufacturers/${manufacturer.slug}#${result.title}`
              break
            case 'ContentfulBlogPost':
              baseLink = `/articles/${result.slug}`
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

  search = event => {
    const query = event.target.value
    const results = this.getSearchResults(query)
    this.setState(s => {
      return {
        results,
        query,
      }
    })
  }
}

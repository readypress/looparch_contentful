import React, { Component } from 'react'
import { Index } from 'elasticlunr'
import Link from 'gatsby-link'
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
      this.search({
        target: {
          value: queryString.parse(this.props.search)[`?s`]
        }
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
            />
            <span className="icon is-medium is-left">
              <i className="fas fa-search fa-lg" />
            </span>
          </div>
        </div>
        {this.state.results.map(result => {
          let manufacturer
          let title = result.title

          if (result.type === 'ContentfulProduct') {
            manufacturer = this.props.data.allContentfulManufacturer.edges.filter(
              edge => {
                return edge.node.id === result.manufacturer
              }
            )[0].node
            title = `${manufacturer.title} - ${result.title}`
          }
          const baseLink =
            result.type === 'ContentfulManufacturer'
              ? `${result.slug}`
              : `${manufacturer.slug}#${result.title}`
          return (
            <div key={result.id} className="search-result">
              <Link to={`/manufacturers/${baseLink}`}>
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

  getOrCreateIndex = () => {
    return this.index
      ? this.index
      : Index.load(this.props.data.siteSearchIndex.index)
  }

  search = evt => {
    const query = evt.target.value

    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      results: this.index
        .search(query, {})
        .map(({ ref }) => this.index.documentStore.getDoc(ref))
        .sort(result => {
          if (result.type === 'ContentfulManufacturer') {
            return -1
          }
          return 1
        })
    })
  }
}

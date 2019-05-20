import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const initialState = { isLoading: false, results: [], value: '' }
const URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      results: [],
      isLoading: false,
      value: ''
    }
    this.fetchPokemon = this.fetchPokemon.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addPokemon = this.addPokemon.bind(this)
    this.fetchPokemon()
  }

  fetchPokemon() {
    fetch(URL)
    .then(res => res.json())
    .then(pokemon => this.setState({pokemon, results: pokemon}))
  }

  handleChange(ev, {value}) {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.pokemon, isMatch),
      })
    }, 300)
  }

  addPokemon(pokemon) {
    this.setState({
      pokemon: [...this.state.pokemon, pokemon]
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search onSearchChange={_.debounce(this.handleChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={(this.state.results.length === 0) ? this.state.pokemon : this.state.results}/>
        <br />
      </div>
    )
  }
}

export default PokemonPage

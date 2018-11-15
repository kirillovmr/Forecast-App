import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchWeather} from '../actions';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = { term: '' };

    // Binding this into the function context
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    let value = event.target.value;
    // Capitalizing first letter
    value.length === 1 ? value = value.toUpperCase() : null;
    this.setState({ term: value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    
    if (this.state.term.length > 0) {
      this.props.fetchWeather(this.state.term);
      this.setState({ term: '' });
    };
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input 
        placeholder="Get a five-day forecast in your favourite cities"
        className="form-control"
        value={this.state.term}
        onChange={this.onInputChange} />
        
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="submit">Submit</button>
        </span>
      </form>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchWeather}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
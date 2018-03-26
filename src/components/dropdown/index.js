import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Dropdown extends React.Component {
  /**
   * Default state.
   */
  state = {
    selected: null
  };

  /**
   * Handle change.
   *
   * @param {object} selected
   */
  handleChange (selected) {
    this.setState({
      selected: selected
    });

    if (this.props.onChange) {
      if (selected) {
        this.props.onChange(selected.value);
      } else {
        this.props.onChange(null);
      }
    }
  }

  /**
   * Render dropdown.
   */
  render () {
    const value = this.state.selected && this.state.selected.value;
    return (
      <Select
        aria-label={this.props.label}
        placeholder={this.props.placeholder}
        value={value || this.props.value}
        onChange={this.handleChange.bind(this)}
        options={this.props.options}
      />
    );
  }
}

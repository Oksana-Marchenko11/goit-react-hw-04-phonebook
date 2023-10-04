import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };
  change = e => {
    // console.log(e);
    const { name, value } = e.target;
    this.setState({ [name]: value, id: nanoid(), [name]: value });
  };

  submit = e => {
    // console.log(e);
    e.preventDefault();
    console.log(this.state.name);
    console.log(e.target.elements.name.value);

    this.props.onSubmit(this.state);
    // console.log(this.props);
    this.reset();
  };
  reset = () => {
    this.setState({ id: '', name: '', number: '' });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.submit}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className={css.input}
          value={this.state.name}
          onChange={this.change}
          type="text"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.label} htmlFor="name">
          Number
        </label>
        <input
          className={css.input}
          value={this.state.number}
          onChange={this.change}
          type="tel"
          name="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.button} type="submit">
          Add contacts
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

import React, { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';
import contactsList from '../data/contacts.json';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: contactsList,
    filter: '',
    name: '',
    number: '',
  };

  addContact = contact => {
    console.log(contact);
    const nameInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (nameInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    const numberInContacts = this.state.contacts.some(
      ({ number }) => number === contact.number
    );
    if (numberInContacts) {
      alert(`${contact.number} is already in contacts`);
      return;
    }

    console.log(this.state.contacts);
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
    console.log(this.state.contacts);
  };

  filterList = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        {this.state.contacts.length ? (
          <Filter value={this.state.filter} onFilter={this.filterList} />
        ) : (
          <p>Your phonebook is empty. Add first contact!</p>
        )}
        {filteredContacts.length ? (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>No contacts to show! Check filter</p>
        )}
      </div>
    );
  }
}

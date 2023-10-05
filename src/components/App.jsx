import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';
import contactsList from '../data/contacts.json';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(contactsList);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const nameInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (nameInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    const numberInContacts = contacts.some(
      ({ number }) => number === contact.number
    );
    if (numberInContacts) {
      alert(`${contact.number} is already in contacts`);

      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
    console.log(contact);
    console.log(contacts);
  };

  const filterList = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      {contacts.length ? (
        <Filter value={filter} onFilter={filterList} />
      ) : (
        <p>Your phonebook is empty. Add first contact!</p>
      )}
      {filteredContacts.length ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>No contacts to show! Check filter</p>
      )}
    </div>
  );
};

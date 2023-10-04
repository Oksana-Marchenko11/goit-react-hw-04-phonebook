import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  console.log(contacts);
  return (
    <div>
      <h3 className={css.contacts_text}>Contacts</h3>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Phone</td>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, number }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{number}</td>
              <td>
                <button
                  className={css.delete_btn}
                  value={id}
                  onClick={() => onDeleteContact(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

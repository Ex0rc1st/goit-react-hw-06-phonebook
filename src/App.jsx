import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

import styles from './App.module.scss';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    const nextContacts = contacts;

    localStorage.setItem('contacts', JSON.stringify(nextContacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    const duplicateName = contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateName) {
      alert(`${newContact.name} is already on contacts`);
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactID => {
    const answer = window.confirm('Want to delete?');

    if (answer) {
      setContacts(contacts.filter(({ id }) => id !== contactID));
    }
  };

  const filteredResults = filterContacts();

  return (
    <Container>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm addContact={addContact} />
      {!!contacts.length && <h2 className={styles.title}>Contacts</h2>}
      {!!contacts.length && <Filter value={filter} onChange={changeFilter} />}
      <ContactList contacts={filteredResults} onDeleteContact={deleteContact} />
    </Container>
  );
};

// class App extends Component {
//   state = {
//     contacts: [
// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if (nextContacts !== prevContacts) {
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }
//   }

//   addContact = data => {
//     const normalizedName = data.name.toLowerCase();
//     const uniqId = Date.now().toString();

//     const newContact = {
//       id: uniqId,
//       name: normalizedName,
//       number: data.number,
//     };

//     const duplicateName = this.state.contacts.find(
//       contact => contact.name === newContact.name
//     );

//     if (duplicateName) {
//       alert(`${newContact.name} is already on contacts`);
//       return;
//     }

//     this.setState(({ contacts }) => ({
//       contacts: [newContact, ...contacts],
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   filterContacts = () => {
//     const { contacts, filter } = this.state;

//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = id => {
//     const answer = window.confirm('Want to delete?');

//     if (answer) {
//       this.setState(prevState => ({
//         contacts: prevState.contacts.filter(contact => contact.id !== id),
//       }));
//     }
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredResults = this.filterContacts();

//     return (
//       <Container>
//         <h1 className={styles.title}>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         <h2 className={styles.title}>Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={filteredResults}
//           onDeleteContact={this.deleteContact}
//         />
//       </Container>
//     );
//   }
// }

export default App;

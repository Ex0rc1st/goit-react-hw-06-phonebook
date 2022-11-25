import { connect } from 'react-redux'; // Импорт функции коннекта к хранилищу
import contactsActions from '../../redux/contacts/contacts-actions'; // Импорт экшенов из контактов

import ContactForm from './ContactForm';

// Из глобального стейта в пропы компонента
const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

// Из глобального стейта в пропы компонента - методы
const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(contactsActions.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

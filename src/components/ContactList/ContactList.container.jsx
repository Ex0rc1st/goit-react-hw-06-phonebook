import { connect } from 'react-redux'; // Импортируем коннект для глобального хранилища
import contactsActions from '../../redux/contacts/contacts-actions'; // Импортируем экшны для диспатчинга

import ContactList from './ContactList';

// // Фильтрует и возвращает результат фильтра
const getfilteredContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

// Из стейта в пропы + в контакты пишет результат функции фильтра
const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getfilteredContacts(items, filter),
});

// Из стейта в пропы - методы
const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

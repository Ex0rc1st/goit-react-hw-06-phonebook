import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

import AddContactButton from '../AddContactButton';

import styles from './ContactForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';

class ContactForm extends Component {
  // Стейт формы
  state = {
    name: '',
    number: '',
  };

  // Следит за инпутом и пишет в локальный стейт его значение
  hanldeChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  // Метод на отправке формы. Формирует из стейта контакт и передает во внешний метод
  hanldeSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;
    const { contacts } = this.props;
    const normalizedName = name.toLowerCase();

    // Проверка на дубликат по имени
    const nameInContacts = contacts.find(
      contact => contact.name === normalizedName
    );

    // Проверка на дубликат по номеру
    const numberInContacts = contacts.find(
      contact => contact.number === number
    );

    // Отправка данных после проверки в экшн
    if (!nameInContacts && !numberInContacts) {
      this.props.onSubmit(name, number);
      this.resetForm();
      return;
    }

    toast.info(`${name} is already in contacts`, {
      autoClose: 2500,
    });
  };

  // Сброс полей формы (после отправки)
  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.hanldeSubmit}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter contact name"
            aria-label="Input for your name"
            className={styles.input}
            value={this.state.name} // Пишет значение в локальный стейт
            onChange={this.hanldeChange} // Наблюдающий метод
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>

        <label className={styles.label}>
          Number
          <input
            type="tel"
            name="number"
            placeholder="Enter phone number"
            aria-label="Input for your phone number"
            className={styles.input}
            value={this.state.number} // Пишет значение в локальный стейт
            onChange={this.hanldeChange} // Наблюдающий метод
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
          />
        </label>

        <AddContactButton />

        <ToastContainer />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

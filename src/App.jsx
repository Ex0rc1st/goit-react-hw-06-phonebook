import Container from './components/Container';
import Logo from './components/Logo';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

const App = () => {
  return (
    <Container>
      <Logo />

      <ContactForm />

      <Filter />

      <ContactList />
    </Container>
  );
};

export default App;

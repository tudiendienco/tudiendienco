import { SnackbarProvider } from 'notistack';
import './App.css';
import HeaderOnly from './layouts/HeaderOnly';
import Dictionary from './pages/Dictionary';

function App() {
  return (
    <SnackbarProvider
      maxSnack={4}
      autoHideDuration={5000}
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className="App">
        <HeaderOnly />
        <Dictionary />
      </div>
    </SnackbarProvider>

  );
}

export default App;

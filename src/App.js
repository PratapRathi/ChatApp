import './App.css'
// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import AlertSnackbar from './components/AlertSnackbar';
// Redux Store component
import { useSelector } from 'react-redux';

function App() {

  const { open, message } = useSelector((state) => state.app.snackbar);

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>


      {/* Snackbar */}
      {message && open ? <AlertSnackbar /> : <></>}

    </>
  );
}

export default App;

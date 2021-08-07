import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignIn from "./components/authentication/login.component";
import StrapiContextProvider from "./context/processContext";
import Landing from "./components/home/home.component";
import Patients from "./components/patients/patients.component";
import Vaccines from "./components/vaccines/vaccines.component";

function App() {
  return (
    <StrapiContextProvider>
        <Router>
            <div className="App">
                <Route path='/' exact><SignIn /></Route>
                <Route path='/login' exact><SignIn /></Route>
                <Route path='/homepage' exact><Landing /></Route>
                <Route path='/patients' exact><Patients /></Route>
                <Route path='/vaccines' exact><Vaccines /></Route>
            </div>
        </Router>
    </StrapiContextProvider>
  );
}

export default App;

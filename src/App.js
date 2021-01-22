import { Switch, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Login, Dashboard } from './pages';
import Test from './pages/Test';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/test'>
          <Test />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

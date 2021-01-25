import { Switch, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Login, Dashboard } from './pages';
import Test from './pages/Test';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <ProtectedRoute path='/dashboard'>
          <Dashboard />
        </ProtectedRoute>
        <Route path='/test'>
          <Test name='Ricardo' />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;

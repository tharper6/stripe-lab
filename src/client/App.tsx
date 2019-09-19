import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/DetailsPage';
import NavBar from './Components/NavBar';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Login from './pages/login';
import Donate from './pages/Donate';


class App extends React.Component {

    render() {
        return(
            <Router>
                <NavBar />
                <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/details/:id' component={Details} />
                    <Route exact path='/add' component={Add} />
                    <Route exact path='/edit/:id' component={Edit} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/donate' component={Donate} />
                </Switch>
                </main>
            </Router>
        )
    }

}

export default App;
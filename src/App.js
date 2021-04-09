import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
//Components
import ToDo from "./Components/ToDo/ToDo";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import NotFound from "./Components/NotFound/NotFound.jsx";
// import SingleTask from "./Components/SingleTask/SingleTask";
// import SingleTaskWithContext from './Components/SingleTask/SingleTaskWithContext';
// import SingleTaskProvider from './Context/Providers/SingleTaskProvider';
import SingleTaskWithReduce from './Components/SingleTask/SingleTaskWithReduce';
import ContactFormProvider from './Context/Providers/ContactFormProvider';



const routes = [
    {
        path: '/',
        component: ToDo,
        exact: true
    },
    {
        path: '/contact',
        component: Contact,
        exact: true
    },
    {
        path: '/about',
        component: About,
        exact: true
    },
    {
        path: "/task/:id",
        component: SingleTaskWithReduce,
        exact: true
    },
    {
        path: "/error/:status",
        component: NotFound,
        exact: true
    }
]

class App extends React.Component {
    render(){
        const routerJSX = routes.map((item, index) => {
            if(index === 1){
                    <Route 
                        key={index} 
                        path={item.path} 
                        render={(props) => (
                            <ContactFormProvider>
                                <item.component {...props}/>
                            </ContactFormProvider>
                        )}
                        exact={item.exact} 
                    />
            }  
            return (
                <Route 
                    key={index} 
                    path={item.path} 
                    component={item.component} 
                    exact={item.exact} 
                />
            )
        })
        return(
            <div className="App">
                <Navbar />
                <Switch>
                    {routerJSX}
                    <Redirect to="/error/404" />
                </Switch>
            </div>
        )
    }
}  

export default App;
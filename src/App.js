import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDoWithRedux from "./Components/ToDo/ToDoWithRedux";
import Menu from "./Components/Navbar/Menu.jsx";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import NotFound from "./Components/NotFound/NotFound.jsx";
import SingleTaskWithRedux from './Components/SingleTask/SingleTaskWithRedux';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Footer from './Components/Footer/Footer';

const routes = [
    {
        path: "/login",
        component: Login,
        exact: true,
        type: 'public'
    },
    {
        path: "/register",
        component: Register,
        exact: true,
        type: 'public'
    },
    {
        path: '/',
        component: ToDoWithRedux,
        exact: true,
        type: 'private'
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
        component: SingleTaskWithRedux,
        exact: true,
        type: 'private'
    },
    {
        path: "/:id",
        component: ToDoWithRedux,
        exact: true,
        type: 'private'
    },
    {
        path: "/error/:status",
        component: NotFound,
        exact: true
    }
]


const App = (props) => {
    const {errorMessage, successMessage, isAuthenticated} = props;
    useEffect(()=> {
        errorMessage &&  toast.error(errorMessage, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        successMessage && toast.success(successMessage, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }, [errorMessage, successMessage]);
    
        const routerJSX = routes.map((Item, i) => {
            const Component = Item.component;
            return (
                <Route 
                    key={i} 
                    path={Item.path} 
                    exact={Item.exact} 
                    render={ (props) => {
                        if(isAuthenticated && Item.type === 'public'){
                            return <Redirect to='/'/>
                        }
                        if(!isAuthenticated && Item.type === 'private'){
                            return <Redirect to='/login'/>
                        }
                        return <Component {...props}/>
                    }}
                />
            )
        })
        return(
            <div className="App">
                <Menu />
                <Switch>
                    {routerJSX}
                    <Redirect to="/error/404" />
                </Switch>
                <Footer />
                <ToastContainer />
            </div>
        )
    
}  
const mapStateToProps = (state) => ({
    errorMessage: state.globalState.errorMessage,
    successMessage: state.globalState.successMessage,
    isAuthenticated: state.globalState.isAuthenticated
})

export default connect(mapStateToProps, null)(App);
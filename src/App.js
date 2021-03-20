import ToDo from "./Components/ToDo/ToDo";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import {Switch, Route, Redirect} from "react-router-dom";


function App(){
    return(
        <div className="App">
            <Navbar />
            <Switch>
                <Route path="/" component={ToDo} exact={true} />
                <Route path="/contact" component={Contact} exact={true} />
                <Route path="/about" component={About} exact={true} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default App;
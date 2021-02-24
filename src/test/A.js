import React from "react";
import B from "./B";
import C from "./C";

class A extends React.Component{
    state = {
        inputValue: ""
    }

    handleSub = (value) => {
        this.setState({
            inputValue: value
        })
    }
    render(){
        return(
            <div className="A">
                <h1>A Component</h1>
                <B handleSub={this.handleSub}/>
                <C value={this.state.inputValue}/>
            </div>
        )
    }
}

export default A;
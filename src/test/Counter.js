import React from "react";
import Country from './Country'

class Counter extends React.Component {
    state = {
        counter: 0,
        counterName: 'counter',
        isArmenia: true
    }
    setCounter = (event) => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    chengeCountry = (event) => {
        this.setState({
            isArmenia: !this.state.isArmenia
        })
    }
    render(){
        const {counter} = this.state;
        const {isArmenia} = this.state;
        return (
            <div> 
                <div>
                    <p>{counter}</p>
                    <button onClick={this.setCounter}>
                        +   
                    </button>
                </div>
                <Country isArmenia={isArmenia} chengeCountry={this.chengeCountry} />
                
            </div>
        )
    }
}

export default Counter;
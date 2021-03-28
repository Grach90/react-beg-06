import { findByLabelText } from "@testing-library/react";


function Acumlator(startValue){
    this.value = startValue;
    this.read = function(){
        this.value = this.value + +prompt("number", 0);
    }

    this.print = function(){
        console.log(this.value);
    }
}

let obj = new Acumlator(1);
obj.read();
obj.print();

function Useer() {
    
    return ( 
    <div>
       
    </div>

    )

}

export default Useer;
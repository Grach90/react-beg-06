import { findByLabelText } from "@testing-library/react";
let a;
function foo(callback){
    setTimeout(() => {
        a = 5;
        callback(a);
    }, 2000);
    
}

foo((a) => console.log(a));


function Useer() {
    
    return ( 
    <div>
       
    </div>

    )

}

export default Useer;
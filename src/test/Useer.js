import { findByLabelText } from "@testing-library/react";

function Useer() {
    let arr = [<tr> <th>№ заявки</th><th>Услуга</th><th>Цена, руб.</th><th>Итого</th> </tr>];
    for (let i = 1; i < 10; i++) {
        let element = <tr><td>{i}</td><td>Пение</td><td>0 000</td><td>0 000</td></tr>;
        arr.push(element);
    }
    return ( 
    <div className="block"> 
       <table> {arr}</table>
       
    </div>
    )

}

export default Useer;
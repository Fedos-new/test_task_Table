import React from "react";
import style from './Table.module.css'


function Table() {


return (
    <div>
        <table className={style.table}>
            <thead>
            <tr >
                <td>Pair name/market</td>
                <td>First</td>
                <td>Second</td>
                <td>Third</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>RUB/CUPCAKE</td>
                <td>80.38</td>
                <td>-1.99</td>
                <td>-1.99</td>
            </tr>
            <tr>
                <td>USD/CUPCAKE</td>
                <td>80.38</td>
                <td>-1.99</td>
                <td>-1.99</td>
            </tr>
            <tr>
                <td>EUR/CUPCAKE</td>
                <td>80.38</td>
                <td>-1.99</td>
                <td>-1.99</td>
            </tr>
            </tbody>
        </table>
    </div>
);
}

export default Table;

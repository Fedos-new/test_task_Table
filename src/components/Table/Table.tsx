import React from "react";
import style from './Table.module.css'


type PropsType = {
    titleMarkets: (string | undefined)[]
    valuesRows: (string | number)[][]
}


function Table(props: PropsType) {


return (
    <div>
        <table className={style.table}>
            <thead>
            <tr>
                <td className={style.firstRow}>Pair name/market</td>
                {
                    props.titleMarkets.map((t, index) => <td key={index}>{t}</td>)
                }
            </tr>
            </thead>
            <tbody>
            {
                props.valuesRows.map((el, index) => <tr key={index}>
                        <td>{el[0]}</td>
                        <td className={style.minPrice}>{el[1]}</td>
                        <td>{el[2]}</td>
                        <td>{el[3]}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    </div>
);
}

export default Table;

import React from 'react';
import style from './Table.module.css'


type PropsType = {
    titleMarkets: (string | undefined)[]
    valuesRows: (string | number)[][]
    setStyle: (num: number) => string | undefined
    error: string
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
                            <td className={props.setStyle(el[1] as number)}>{el[1]}</td>
                            <td className={props.setStyle(el[2] as number)}>{el[2]}</td>
                            <td className={props.setStyle(el[3] as number)}>{el[3]}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>

            {props.error && <div className={style.error}>Error loading data: {props.error}</div>}
        </div>
    )
}

export default Table;

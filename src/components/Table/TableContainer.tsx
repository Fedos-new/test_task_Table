import React, {useEffect} from "react";
import Table from "./Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../bll/store";
import {fetchData, MarketType} from "../../bll/reducer";
import {getValueRowsForTable} from "../../utils/selector-data";
import style from "./Table.module.css";

function TableContainer() {

    const dispatch = useDispatch()
    const markets = useSelector<AppRootState, MarketType[]>(state => state.tableMarket.markets)
    const titleMarkets = [markets[0].name, markets[1].name, markets[2].name]


    console.log(markets)
    const valuesRows = getValueRowsForTable(markets)

    const minPrices = getValueRowsForTable(markets).reduce((acc: number[], el: (string | number)[]) => {
        const findMin = (arr: number[]) => Math.min(...arr)
        let min = findMin(el.splice(1) as number[])
        acc.push(min)
        return acc
    }, []);

    const setStyle = (num: number) => {
        return `${!minPrices.includes(num) 
            ? style.cell
            : style.minPrice}`
    }


    useEffect(() => {
        dispatch(fetchData(1, 'First'))
        dispatch(fetchData(2, 'Second'))
        dispatch(fetchData(3, 'Third'))

    }, [])

    return (
        <Table
            titleMarkets={titleMarkets}
            valuesRows={valuesRows}
            setStyle={setStyle}
        />
    );
}

export default TableContainer;

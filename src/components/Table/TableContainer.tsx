import React, {useEffect} from "react";
import Table from "./Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../bll/store";
import {fetchData, MarketType} from "../../bll/reducer";
import {getValueRowsForTable} from "../../utils/selector-data";


function TableContainer() {

    const dispatch = useDispatch()
    const markets = useSelector<AppRootState, MarketType[]>(state => state.tableMarket.markets)
    const titleMarkets = [markets[0].name, markets[1].name, markets[2].name]


    console.log(markets)
    const valuesRows = getValueRowsForTable(markets)

    useEffect(() => {
        dispatch(fetchData(1, 'First'))
        dispatch(fetchData(2, 'Second'))
        dispatch(fetchData(3, 'Third'))

    }, [])

    return (
        <Table
            titleMarkets={titleMarkets}
            valuesRows={valuesRows}
        />
    );
}

export default TableContainer;

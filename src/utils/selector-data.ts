import {MarketType} from '../bll/reducer';

export const getValueRowsForTable = (state: MarketType[]) => {
    const rowNames = Object.keys(state[0].rates)
    const rowValue1 = Object.values(state[0].rates)
    const rowValue2 = Object.values(state[1].rates)
    const rowValue3 = Object.values(state[2].rates)

    let result: Array<Array<string | number>> = []

    rowNames.forEach((el, index) => {
        return result.push([el, rowValue1[index], rowValue2[index], rowValue3[index]])
    })
    return result
}

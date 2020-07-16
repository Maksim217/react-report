import {DateReceipt} from '../date/date'

export class Sort {

    static sortPrice(currentPrice, nextPrice, order) {
        const convertedCurrentPrice = +currentPrice.replace(' ', '')
        const convertedNextPrice = +nextPrice.replace(' ', '')

        if(order === 'asc') {
            return convertedNextPrice - convertedCurrentPrice
        } else {
            return convertedCurrentPrice - convertedNextPrice
        }
    }

    static sortDate(currentDate, nextDate, order) {
        let convertedCurrentDate, convertedNextDate

        if(DateReceipt.isValidDate(currentDate)) {
            convertedCurrentDate = DateReceipt.dateConversion(currentDate)
        } else {
            convertedCurrentDate = DateReceipt.dateConversion('01.01.1970')
        }

        if(DateReceipt.isValidDate(nextDate)) {
            convertedNextDate = DateReceipt.dateConversion(nextDate)
        } else {
            convertedNextDate = DateReceipt.dateConversion('01.01.1970')
        }

        if(order === 'asc') {
            return DateReceipt.compareDate(convertedNextDate, convertedCurrentDate)
        } else {
            return DateReceipt.compareDate(convertedCurrentDate, convertedNextDate)
        }
    }

    static sortString(currentString, nextString, order) {
        if(order === 'asc') {
            return nextString.localeCompare(currentString)
        } else {
            return currentString.localeCompare(nextString)
        }
    }

    static sortHandler = (currentValue, nextValue, order, dataField) => {
        if(dataField === 'price') {

            return this.sortPrice(currentValue, nextValue, order)   

        } else if(dataField === 'dateReceipt') {

            return this.sortDate(currentValue, nextValue, order)

        } else {
            
            return this.sortString(currentValue, nextValue, order)

        }
    }

}

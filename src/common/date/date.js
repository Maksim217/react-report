
export class DateReceipt {

    static dateConversion(date) {
        const convertedDate = {
            year:  date.slice(6),
            month: date.slice(3, 5) - 1,
            date:  date.slice(0, 2)    
        }  
          
        return new Date(convertedDate.year, convertedDate.month, convertedDate.date)
    }
    
    static isValidDate(date) {
        const convertedDate = this.dateConversion(date)
        const result = new Date(convertedDate)
        if(result.toString() === 'Invalid Date') {
            return false   
        }
        return true
    }

    static compareDate(date1, date2){
        if(date1.valueOf() > date2.valueOf()) {
            return 1
        } 
        return -1
    }
}
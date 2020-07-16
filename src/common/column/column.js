import {dictionary} from '../../dictionary/dictionary'
import {Letter} from '../letter/letter'
import {Sort} from '../sort/sort'

export class Column {

    static setStyleClumn = (nameColumn) => {
        const defaultStyle = {
            width: '10%',
            textAlign: 'left'    
        }

        if(nameColumn === 'keyFeatures') {
            return {
                ...defaultStyle,
                width: '40%'    
            }
        } else if(nameColumn === 'productName') {
            return {
                ...defaultStyle,
                width: '20%'
            }
        }
    }
    
    static getColumns(namesColumns) {
        const columns = []
        
        namesColumns.forEach(nameColumn => {
            const isSort = nameColumn !== 'keyFeatures' ? true : false
            const isHidden =  nameColumn !== 'id' ? false : true

            columns.push(
                {
                    dataField: `${nameColumn}`, 
                    text: Letter.capitalizeFirstLetter(`${dictionary.get(nameColumn)}`), 
                    sort: isSort,
                    sortFunc: Sort.sortHandler,
                    hidden: isHidden,
                    headerStyle: (column) => this.setStyleClumn(column.dataField)
                }
            )
        })
        return columns
    }

    static reorderColumns(columnsName) {

      const objKeys = {
          '0': '5',
          '1': '0',
          '2': '3',
          '3': '1',
          '4': '4',
          '5': '2'
      } 
      
      let reorder = []
      let key = ''
      
      const length = Object.keys(objKeys).length
      
      for(let i = 0; i < length; i++) {
        key =  objKeys[i] 
        reorder[key] = columnsName[i]  
      }
      
      return reorder 
    }
}

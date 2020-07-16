import axios from '../../axios/axios-report'
import {Column} from '../../common/column/column'
import {
    FETCH_REPORTS_START,
    FETCH_REPORTS_SUCCESS,
    FETCH_REPORTS_ERROR,
    FETCH_REPORT_BY_CATEGORY_SUCCESS
} from './actionTypes'

export function fetchReports() {
    return async dispatch => {
        try{
            dispatch(fetchReportsStart())
            const response = await axios.get('/products.json')   
            const keys = Object.keys(response.data)
            const tabs = []
            const reports = getReportsData(response.data)
            const report = getDataToolkitProvider(response.data)

            keys.forEach(key => {
                const tab = (Object.keys(response.data[key])[0])
                tabs.push(tab)
            })
            dispatch(fetchReportsSuccess(tabs, reports, report))
    
        }catch(error) {
            dispatch(fetchReportsError(error))
        }    
    }
}

export function fetchReportByCategory(tabName) {
    return (dispatch, getState)  => {
        const reportData = getState().report.reports[tabName]
        const report = getDataToolkitProviderByCategory(reportData)
        dispatch(fetchReportByCategorySuccess(report))
    }
}

export function fetchReportsStart() {
    return {
        type: FETCH_REPORTS_START
    }
}

export function fetchReportsSuccess(tabs, reports, report) {
    return {
        type: FETCH_REPORTS_SUCCESS,
        tabs,
        reports,
        report
    }
}

export function fetchReportByCategorySuccess(report) {
    return {
        type: FETCH_REPORT_BY_CATEGORY_SUCCESS,
        report
    }
}

export function fetchReportsError(error) {
    return {
        type: FETCH_REPORTS_ERROR,
        error
    }
}

function getDataToolkitProvider(data) {
    const keyProductsCategory = Object.keys(data)[0]
    const nameProductsCategory = Object.keys(data[keyProductsCategory])[0]
    const dataProductsCategory = data[keyProductsCategory][nameProductsCategory]
    const columnsName = Object.keys(dataProductsCategory[0])
    const reorderedColumns = Column.reorderColumns(columnsName)
    const keyField = reorderedColumns[0] 

    return {
        data: dataProductsCategory,
        columnsName: reorderedColumns,
        keyField
    }    
}

function getDataToolkitProviderByCategory(data) {
    const columnsName = Object.keys(data[0])
    const reorderedColumns = Column.reorderColumns(columnsName)
    const keyField = reorderedColumns[0] 

    return {
        data,
        columnsName: reorderedColumns,
        keyField
    }    
}

function getReportsData(reports) {
    const data = {}
    const keysProductsCategory = Object.keys(reports)
    keysProductsCategory.forEach(key => {
        const category = Object.keys(reports[key])
        data[category] = reports[key][category]    
    })
    
    return data       
}

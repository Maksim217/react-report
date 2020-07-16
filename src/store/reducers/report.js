import {
    FETCH_REPORTS_START,
    FETCH_REPORTS_SUCCESS,
    FETCH_REPORTS_ERROR,
    FETCH_REPORT_BY_CATEGORY_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    tabs: [],
    reports: {},
    report: {},
    error: null    
}

export default function reportReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_REPORTS_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_REPORTS_SUCCESS:
            return {
                ...state,
                tabs: action.tabs,
                reports: action.reports,
                report: action.report,
                loading: false
            } 
        case FETCH_REPORT_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                report: action.report
            }    
        case FETCH_REPORTS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }        
        default:
            return state
    }
}
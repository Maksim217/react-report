import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import ClearButton from '../../components/UI/ClearButton/ClearButton' 
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory from 'react-bootstrap-table2-editor'
import {Tabs, TabPanel, Tab, TabList} from 'react-tabs'
import {dictionary} from '../../dictionary/dictionary'
import 'react-tabs/style/react-tabs.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import Loader from '../../components/UI/Loader/Loader'
import {fetchReports, fetchReportByCategory} from '../../store/actions/report'
import {Column} from '../../common/column/column'
import {Letter} from '../../common/letter/letter'
import {isEmpty} from '../../utils/validators/validators'

const { SearchBar } = Search

class Report extends Component {

    componentDidMount() {
        this.props.fetchReports()    
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.report !== nextProps.report || this.props.isAuth !== nextProps.isAuth
    }

    renderTabList(productCategoriesList){
        return productCategoriesList.map((tabName, index) => (
            <Tab 
                onClick={() => this.props.fetchReportByCategory(tabName)} 
                key={`${index + 1}`}
            >
                {Letter.capitalizeFirstLetter(dictionary.get(tabName))}
            </Tab>
        ))    
    }

    renderTabPanels(productCategoriesList, baseData){
        
        return productCategoriesList.map((tabPanel, index) => (
            <TabPanel key={`${tabPanel + ' ' + index + 1}`}>     
                <BootstrapTable
                    {...baseData}
                    filter={filterFactory()}
                    pagination={paginationFactory()}
                    cellEdit= { this.props.isAuth ? cellEditFactory({ mode: 'dbclick' }) : cellEditFactory() }
                    noDataIndication="Нет данных"
                    striped
                    hover
                    condensed
                />
            </TabPanel>
        ))
    }
    
    render() {
        return (
            <Fragment>
                <Fragment>
                    {  this.props.loading || isEmpty(this.props.report) ? <Loader /> :
                        <ToolkitProvider
                            bootstrap4
                            keyField={this.props.report.keyField}
                            data={this.props.report.data}
                            columns={Column.getColumns(this.props.report.columnsName)}
                            search
                        >
                        {props => (
                            <Fragment>
                                <div className='text-right'>
                                    <SearchBar
                                        {...props.searchProps}
                                        style={{ width: "400px", height: "40px" }}
                                    />
                                    <ClearButton
                                        {...props.searchProps}
                                        label='Очистить'
                                    />
                                </div>
                                <Tabs>
                                    <TabList>
                                        { this.renderTabList(this.props.tabs) }
                                    </TabList>
                                        { this.renderTabPanels(this.props.tabs, {...props.baseProps}) }    
                                </Tabs>
                            </Fragment>
                        )}
                    </ToolkitProvider>   
                    }
                </Fragment>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        report: state.report.report,
        tabs: state.report.tabs,
        loading: state.report.loading,
        isAuth: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchReports: () => dispatch(fetchReports()),
        fetchReportByCategory: category => dispatch(fetchReportByCategory(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)

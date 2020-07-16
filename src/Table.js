import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import { Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ClearButton from './components/UI/ClearButton/ClearButton'

const { SearchBar } = Search;

let nameFilter;
let priceFilter;
let stockFilter;
let originFilter;

// const ClearButton = props => {
//   const handleClick = () => {
//     props.onSearch("");
//     props.clearAllFilter();
//   };
//   return (
//     <Button
//       variant="secondary"
//       onClick={handleClick}
//       style={{
//         fontSize: "16px",
//         padding: "5px",
//         margin: "10px",
//         height: "40px"
//       }}
//     >
//       Clear
//     </Button>
//   );
// };

class Table extends React.Component {

  state = {
      data: []
  }

  columns = [
    {
      dataField: "name",
      text: "Product Name",
      filter: textFilter({
        getFilter: filter => {
          nameFilter = filter;
        }
      })
    },
    {
      dataField: "price",
      text: "Price",
      filter: textFilter({
        getFilter: filter => {
          priceFilter = filter;
        }
      }),
      sort: true
    },
    {
      dataField: "stock",
      text: "Stock",
      filter: textFilter({
        getFilter: filter => {
          stockFilter = filter;
        }
      })
    },
    {
      dataField: "origin",
      text: "Origin",
      filter: textFilter({
        getFilter: filter => {
          originFilter = filter;
        }
      })
    }
  ];

  clearAllFilter() {
    nameFilter("");
    priceFilter("");
    originFilter("");
    stockFilter("");
  }

  products = [
    {
      name: "apple",
      price: 100,
      stock: 10,
      origin: "japan"
    },
    {
      name: "orange",
      price: 150,
      stock: 35,
      origin: "spain"
    },
    {
      name: "pineapple",
      price: 300,
      stock: 4,
      origin: "america"
    }
  ];

  products2 = [
    {
      name: "samsung",
      price: 1000,
      stock: 11,
      origin: "japan"
    },
    {
      name: "sony",
      price: 250,
      stock: 45,
      origin: "japan"
    }
  ];

  render() {
    return (
      <div>
        <ToolkitProvider
          bootstrap4
          keyField="name"
          data={this.state.data}
          columns={this.columns}
          search
        >
          {props => (
            <div>
              <SearchBar
                {...props.searchProps}
                style={{ width: "400px", height: "40px" }}
              />
              <ClearButton
                {...props.searchProps}
                clearAllFilter={this.clearAllFilter}
                label='Clear'
              />
              <Tabs>
                <TabList>
                   <Tab onClick={() => {
                       this.setState({
                           data: this.products
                       })
                   }} key='1'>
                       Tab1
                    </Tab> 
                   <Tab onClick={() => {
                       this.setState({
                           data: this.products2
                       })
                   }} key='2'>Tab2</Tab>
                </TabList>
                <TabPanel key='1'>
                    <BootstrapTable
                        {...props.baseProps}
                        filter={filterFactory()}
                        noDataIndication="There is no solution"
                        striped
                        hover
                        condensed
                    />
                </TabPanel>
                <TabPanel key='2'>
                    <BootstrapTable
                        {...props.baseProps}
                        filter={filterFactory()}
                        noDataIndication="There is no solution"
                        striped
                        hover
                        condensed
                    />
                </TabPanel>
              </Tabs>
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default Table;

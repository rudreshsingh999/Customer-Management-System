import React, { useState, useEffect } from 'react';
import {
  PagingState,
  SearchState,
  DataTypeProvider,
  EditingState,
  IntegratedFiltering,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableEditRow,  
  PagingPanel,
  ColumnChooser,
  SearchPanel,
  TableColumnVisibility,
  Toolbar
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import axios from 'axios';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar'

const TableComponent = ({ ...restProps }) => (
    <Table.Table
      { ...restProps }
      className="table-striped"
    />
  );
  

function Payment ()
{
    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'vc', title: 'VC' },
        { name: 'January', title: 'January' },
        { name: 'February', title: 'February' },
        { name: 'March', title: 'March'},
        { name: 'April', title: 'April' },
        { name: 'May', title: 'May' },
        { name: 'June', title: 'June'},
        { name: 'July', title: 'July' },
        { name: 'August', title: 'August' },
        { name: 'September', title: 'September'},
        { name: 'October', title: 'October' },
        { name: 'November', title: 'November' },
        { name: 'December', title: 'December'},
    ]);
    const [rows, setRows] = useState([]);
    const [rows_f, setRows_f] = useState([]);
    const [defaultHiddenColumnNames] = useState(['vc', 'January', 'February', 'March', 'April', 'May', 'June']);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/status');
        setRows(result.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(rows);
        var temp = [];
        for(var i = 0; i < rows.length; i++) {
            var tempObj = {};
            tempObj._ID = rows[i]._ID;
            tempObj.name = rows[i].name;
            tempObj.vc = rows[i].vc;
            let final = {
                ...tempObj,
                ...rows[i].payment
            };
            temp.push(final);
        }
        setRows_f(temp);
        console.log(temp);
    }, [rows]);

    const BooleanFormatter = ({ value }) => (
        <span className="badge badge-secondary">
          {value ? 'Yes' : 'No'}
        </span>
    );

    const BooleanEditor = ({ value, onValueChange }) => (
        <select
          className="form-control"
          value={value}
          onChange={e => onValueChange(e.target.value === 'true')}
        >
          <option value={false}>
            No
          </option>
          <option value>
            Yes
          </option>
        </select>
    );

    const BooleanTypeProvider = props => (
        <DataTypeProvider
          formatterComponent={BooleanFormatter}
          editorComponent={BooleanEditor}
          {...props}
        />
    );
    const [booleanColumns] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

    const commitChanges = ({ changed }) => {
        let changedRows;
        if (changed) {
            console.log(changed);
            var i;
            let objIndex;
            for (i = 0; i < rows.length; i++) {
                if(changed[i] !== undefined) {
                    objIndex = i;
                    break;
                }
            }
            let f = Object.keys(changed[objIndex]);
            for(i = 0; i < f.length; i++) {
                rows_f[objIndex][f[i]] = true;
            }
            console.log(rows_f[objIndex]);
            changedRows = [...rows_f];
            var put_local = {...rows_f[objIndex]};
            var put = {};
            put.name = put_local.name;
            put.vc = put_local.vc;
            delete put_local['name'];
            delete put_local['vc'];
            var id = put_local['_ID'];
            delete put_local['_ID'];
            put.payment = put_local;
            axios.put(`http://localhost:5000/status/payment/${id}`, put);
            console.log(put);
        }
        setRows_f(changedRows);
    };
    return (
        <div>
            <NavBar />
            <div class="container-fluid">
                <div class="row">
                    <SideBar />
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        <div className="container">
                            <div>
                            <Grid
                                rows={rows_f}
                                columns={columns}
                            >
                            
                            <PagingState
                                defaultCurrentPage={0}
                                pageSize={10}
                            />

                            <BooleanTypeProvider
                                for={booleanColumns}
                            />

                            <EditingState
                                onCommitChanges={commitChanges}
                                defaultEditingRowIds={[0]}
                            />
                            <PagingState
                                defaultCurrentPage={0}
                                pageSize={10}
                            />
                            <SearchState defaultValue="" />
                            <IntegratedFiltering />
                            <IntegratedPaging />
                            <Table tableComponent={TableComponent}/>
                            <TableHeaderRow />
                            <TableEditRow />
                            <TableEditColumn
                                showEditCommand
                            />
                            <TableColumnVisibility
                            defaultHiddenColumnNames={defaultHiddenColumnNames}
                            />
                            <Toolbar />
                            <SearchPanel />
                            <ColumnChooser />
                            <PagingPanel />
                            </Grid>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Payment;
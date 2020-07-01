import React, { useState, useEffect } from 'react';
import {
  PagingState,
  SearchState,
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
import { EditingState } from '@devexpress/dx-react-grid';
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
  

function Dashboard ()
{
    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'vc', title: 'VC' },
        { name: 'phone', title: 'Phone' },
        { name: 'address', title: 'Address' },
        ]);
    const [rows, setRows] = useState([]);
    const [defaultHiddenColumnNames] = useState(['phone', 'address']);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/status');
        setRows(result.data);
        };
        fetchData();
        
    }, []);

    const [editingColumnExtensions] = useState([
        {
            columnName: 'name',
            createRowChange: (row, value) => ({...row,  name: value }),
        },
        {
            columnName: 'vc',
            createRowChange: (row, value) => ({...row,  vc: value }),
        },
        {
            columnName: 'phone',
            createRowChange: (row, value) => ({...row,  phone: value }),
        },
        {
            columnName: 'address',
            createRowChange: (row, value) => ({...row,  address: value }),
        },
    ]);

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            console.log(added[0])
            axios.post('http://localhost:5000/status', {"name": added[0].name, "vc": added[0].vc, "phone": added[0].phone, "address": added[0].address});
            changedRows = [
                ...rows,
                ...added.map((row) => ({
                ...row
                })),
            ];
        }
        if (changed) {
            
            var i;
            let objIndex;
            for (i = 0; i < rows.length; i++) {
                if(changed[i] !== undefined) {
                    objIndex = i;
                    break;
                }
            }
            axios.put(`http://localhost:5000/status/${changed[objIndex]._ID}`, changed[objIndex]);
            rows[objIndex] = changed[objIndex];
            changedRows = [...rows];
        }
        if (deleted) {
            console.log(rows[deleted]._ID);
            axios.delete(`http://localhost:5000/${rows[deleted]._ID}`);
            changedRows = rows.filter(row => row._ID !== rows[deleted]._ID);
        }
        setRows(changedRows);
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
                                rows={rows}
                                columns={columns}
                            >

                            <PagingState
                                defaultCurrentPage={0}
                                pageSize={10}
                            />

                            <EditingState
                                columnExtensions={editingColumnExtensions}
                                onCommitChanges={commitChanges}
                            />
                            <SearchState defaultValue="" />
                            <IntegratedFiltering />
                            <IntegratedPaging />
                            <Table tableComponent={TableComponent}/>
                            <TableHeaderRow />
                            <TableEditRow />
                            <TableEditColumn showAddCommand showEditCommand showDeleteCommand/>
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

export default Dashboard;
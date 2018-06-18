import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

function employeeList() {
  return [
    {
      OrderId: 1111,
      OrderOwner: "swami",
      OrderName: "Rice",
      OrderQutantity: "1kg",
      OrderPrice: 40,
      OrderCreationDate: "15-06-2018",
      OrderStatus: "Pending"
    },
    {
      OrderId: 101,
      OrderOwner: "amar",
      OrderName: "Rice",
      OrderQutantity: "1kg",
      OrderPrice: 40,
      OrderCreationDate: "15-06-2018",
      OrderStatus: "Pending"
    }
  ];
}
class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: {}, selectall: 0, data: employeeList() };
    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow(OrderId) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[OrderId] = !this.state.selected[OrderId];
    this.setState({
      selected: newSelected,
      selectall: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};
    if (this.state.selectall === 0) {
      this.state.data.forEach(x => {
        newSelected[x.OrderId] = true;
      });
    }
    this.setState({
      selected: newSelected,
      selectall: this.state.selectall === 0 ? 1 : 0
    });
  }

  handleAdd() {
    alert("Data is Sucessfully Added.....");
  }
  handleEdit() {
    alert("Hello");
  }
  handleDelete() {
    alert("Data is Sucessfully Added.....");
  }
  render() {
    var data = [];
    const columns = [
      // {
      //   Header: '',
      //   Cell: row => (
      //     <div>
      //       <button onClick={() => handleEdit(row.original)}>Edit</button>
      //       <button onClick={() => handleDelete(row.original)}>Delete</button>
      //     </div>
      //   )
      // },
      {
        id: "checkbox",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selected[original.OrderId] === true}
              onChange={() => this.toggleRow(original.OrderId)}
            />
          );
        },
        Header: x => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selectall === 1}
              ref={input => {
                if (input) {
                  input.indeterminate = this.state.selectall === 2;
                }
              }}
              onChange={() => this.toggleSelectAll()}
            />
          );
        }
      },
      {
        Header: "OrderId",
        accessor: "OrderId"
      },
      {
        Header: "OrderOwner",
        accessor: "OrderOwner",
        sortable: false
      },
      {
        Header: "OrderName",
        accessor: "OrderName"
      },
      {
        Header: "OrderQutantity",
        accessor: "OrderQutantity"
      },
      {
        Header: "OrderPrice",
        accessor: "OrderPrice"
      },
      {
        Header: "OrderCreationDate",
        accessor: "OrderCreationDate"
      },
      {
        Header: "OrderStatus",
        accessor: "OrderStatus"
      }
    ];
    return (
      <div>
        <div>
          <button onClick={() => this.handleAdd()}>Add</button>|
          <button onClick={() => this.handleEdit()}>Edit</button>|
          <button onClick={() => this.handleDelete()}>Delete</button>
        </div>

        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultSorted={[{ id: "OrderId", desc: false }]}
        />
      </div>
    );
  }
}
export default Edit;
//return <div>{listsrow.map(item => <ReactTable {...item} />)}</div>;

//const rootElement = document.getElementById("root");
ReactDOM.render(<Edit />, document.getElementById("root"));

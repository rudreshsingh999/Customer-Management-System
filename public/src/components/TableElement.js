import React, {Component} from 'react'

class TableElement extends Component {

    handleEdit = event=> {
      event.preventDefault();
      this.props.getone(this.props.user._ID);
      console.log(event);
    }

    handleDelete = event=> {
        event.preventDefault();
        this.props.delete(this.props.user._ID);
        console.log(this.props.user._ID);
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.password}</td>
                <td>
                    <button onClick={this.handleEdit} className="btn btn-sm btn-primary">
                    <i className="fa fa-pencil"></i>
                    </button>
                </td>
                <td>
                    <button onClick={this.handleDelete} className="btn btn-sm btn-danger">
                    <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

export default TableElement;
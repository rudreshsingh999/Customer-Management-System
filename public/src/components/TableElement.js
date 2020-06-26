import React, {Component} from 'react'
class TableElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNew : this.props.user.is_new
        }
    }

    handleEdit = event=> {
        event.preventDefault();
        this.props.getone(this.props.user.username);
        console.log(event);
    }

    handleDelete = event=> {
        // axios.post(`http://localhost:5000/sendmail/1`, {"email" : this.props.user.email});
        event.preventDefault();
        this.props.delete(this.props.user.username);
        console.log(this.props.user.username);
    }

    handleAccept = event=> {
        // axios.post(`http://localhost:5000/sendmail/2`, {"email" : this.props.user.email});
        event.preventDefault();
        this.setState({
            isNew : "0"
        })
    }

    render() {
        const isNew = this.state.isNew;
        let button;
        if(isNew === "0") {
            button = <button onClick={this.handleEdit} className="btn btn-sm btn-outline-primary">
                        <i className="fa fa-pencil"></i>
                        </button>
        }
        else {
            button = <button onClick={this.handleAccept} className="btn btn-sm btn-outline-success">
                        <i className="fa fa-check"></i>
                        </button>
        }

        return (
            <tr>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.password}</td>
                <td>
                    {button}
                </td>
                <td>
                    <button onClick={this.handleDelete} className="btn btn-sm btn-outline-danger">
                    <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

export default TableElement;
import React, {Component} from 'react'

class FormElement extends Component {

    handleSubmit = event=> {
      event.preventDefault();
      this.props.submit(event, this.props.id);
      console.log(event);
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" name="name" onChange={this.props.handleChange} className="form-control" value={this.props.name} placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="text" name="email" onChange={this.props.handleChange} className="form-control" value={this.props.email} placeholder="Email" />
                </div>
                <div className="form-group">
                  <input type="text" name="password" onChange={this.props.handleChange} className="form-control" value={this.props.password} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Submit</button>
            </form>
        );
    }
}

export default FormElement;
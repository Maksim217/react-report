import React, {Component} from 'react'

class Alert extends Component {

    state = {
        alert: true
    }

    closeHandler = () => {
        this.setState({
            alert: false
        })
    }

    render() {

        if(!this.state.alert)
            return null 

        let errorMessage = this.props.alertText.toString().trim();

        if(this.props.alertText.toString().trim() === 'Error: Request failed with status code 400')
            errorMessage = 'Неверный логин или пароль'     

        return (
            <div className={`alert alert-${this.props.alertType || 'secondary'} alert-dismissible fade show`} role="alert">
                <strong>{errorMessage}</strong> 
                <button 
                    type="button" 
                    className="close" 
                    data-dismiss="alert" 
                    aria-label="Close" 
                    onClick={this.closeHandler}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}

export default Alert
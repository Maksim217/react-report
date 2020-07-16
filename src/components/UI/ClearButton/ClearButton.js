import React, {Component} from 'react'
import classes from './ClearButton.module.css'
import {Button} from 'react-bootstrap'

class ClearButton extends Component {
    handleClick = () => {
        this.props.onSearch("");
    }

    render() {
        return (
            <Button
              variant="secondary"
              onClick={this.handleClick}
              className={classes.ClrearButton}
            >
                {this.props.label}
            </Button>
        ) 
    }
}

export default ClearButton
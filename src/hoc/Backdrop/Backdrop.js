import React from 'react'
import classes from './Backdrop.module.css'
import Icon from '../../components/UI/Icon/Icon'

const Backdrop = props => {
    return (
        <div 
            className={classes.Backdrop}
        >
            <Icon 
                iconType='fa-times'
                onClickHandler={props.closeAuthForm}
            />
            {props.children}
        </div>
    )
}

export default Backdrop
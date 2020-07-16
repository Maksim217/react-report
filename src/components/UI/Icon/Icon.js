import React from 'react'
import classes from './Icon.module.css'

const Icon = props => {
    const cls = [
        classes.Icon,
        'fa',
        props.iconType
    ]

    return (
        <i
            className={cls.join(' ')}
            onClick={props.onClickHandler}
        />
    )
}

export default Icon
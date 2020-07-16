import React from 'react'
import classes from './FormsControls.module.css'

function getClassControl({error, touched}) {
    const cls = ['']

    if(error && touched) 
        cls.push(classes.error) 
    
    return cls    
}

export const InputEmail = ({input, meta, ...props}) => {
    const cls = getClassControl(meta)

    return (
        <div className='form-group'>
            <label htmlFor="inputEmail">Email</label>
            <div className={cls.join('')}>
                <input {...input} {...props} />
            </div>
            { meta.touched && meta.error && <small 
                                                id="emailHelp" 
                                                className={classes.errorText}
                                            >{meta.error}</small>
            }
        </div>
    )
}

export const InputPassword = ({input, meta, ...props}) => {
    const cls = getClassControl(meta)

    return (
        <div className='form-group'>
            <label htmlFor="inputPassword">Пароль</label>
            <div className={cls.join('')}>
                <input {...input} {...props} />
            </div>
            { meta.touched && meta.error && <small 
                                                id="emailHelp" 
                                                className={classes.errorText}
                                            >{meta.error}</small>
            }
        </div>
    )
}
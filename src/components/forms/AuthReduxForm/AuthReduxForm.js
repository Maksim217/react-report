import React from 'react'
import {Button} from 'react-bootstrap'
import classes from './AuthReduxForm.module.css'
import {Field, reduxForm} from 'redux-form'
import {reqired, maxLengthCreator, minLengthCreator} from '../../../utils/validators/validators'
import {InputEmail, InputPassword} from '../../UI/FormsControls/FormsControls'

const maxLength16 = maxLengthCreator(16)
const minLength6  = minLengthCreator(6)

const AuthForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.AuthForm}>
            <Field 
                component={InputEmail} 
                type="email" 
                className="form-control" 
                name="inputEmail" 
                aria-describedby="emailHelp" 
                placeholder="Введите email" 
                validate={[reqired]}
            />
            <Field 
                component={InputPassword} 
                type="password" 
                className="form-control" 
                name="inputPassword" 
                placeholder="Введите пароль" 
                validate={[reqired, minLength6, maxLength16]}
            />
            <Button 
                onClick={props.handleSubmit(values => 
                    props.onSubmit({
                        ...values,
                        typeButton: 'signIn'
                }))} 
                variant='success'
                className='mr-2'
                disabled={props.isLoading}
            >{props.isLoading && props.isLogin ? '...Вход' : 'Войти'}</Button>

            <Button 
                onClick={props.handleSubmit(values => 
                    props.onSubmit({ 
                    ...values,
                    typeButton: 'signUp'
                }))} 
                variant='primary'
                disabled={props.isLoading}
            >{props.isLoading && !props.isLogin ? '...Регистрация' : 'Зарегистрироваться'}</Button>
        </form>
    )
}

export const AuthReduxForm = reduxForm({form: 'auth'})(AuthForm)

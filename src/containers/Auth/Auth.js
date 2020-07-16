import React, {Component} from 'react'
import classes from './Auth.module.css'
import {AuthReduxForm} from '../../components/forms/AuthReduxForm/AuthReduxForm'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'
import Alert from '../../components/UI/Alert/Alert'

class Auth extends Component {

    registerHandler = (email, password) => {
        this.props.auth(email, password, false)  
    }

    loginHandler = (email, password) => {
        this.props.auth(email, password, true)
    }

    onSubmit = (formData) => {
        if(formData.typeButton === 'signIn') {
          this.loginHandler(formData.inputEmail, formData.inputPassword)
        } else if(formData.typeButton === 'signUp') {
          this.registerHandler(formData.inputEmail, formData.inputPassword)
        }
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    {
                        this.props.error && <Alert
                                                alertType='danger'
                                                alertText={this.props.error}
                                            />
                    }
                    <AuthReduxForm 
                        isLoading={this.props.loading} 
                        isLogin={this.props.isLogin}
                        onSubmit={this.onSubmit}
                    />	
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        isLogin: state.auth.isLogin,
        isAuth: !!state.auth.token,
        error:  state.auth.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
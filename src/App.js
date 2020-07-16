import React, {Component,Fragment} from 'react'
import {connect} from 'react-redux'
import Report from './containers/Report/Report'
import Navbar from './components/Navbar/Navbar'
import Backdrop from './hoc/Backdrop/Backdrop'
import Auth from './containers/Auth/Auth'
import {autoLogin, authClearError} from './store/actions/auth'
import Alert from './components/UI/Alert/Alert'
import {INFO} from './components/UI/Alert/alertTexts'

class App extends Component {

  state = {
    authForm: false
  }

  componentDidMount() {
    this.props.autoLogin()
  }

  showAuthForm = () => {
    this.setState({
        authForm: true
    })
  } 

  closeAuthForm = () => {
    this.setState({
        authForm: false
    })
    this.props.authClearError()
  }

  render() {
    return(
        <Fragment>
          {
            this.state.authForm && !this.props.isAuth
                ? <Backdrop 
                    closeAuthForm={this.closeAuthForm}
                  >
                    <Auth/>
                  </Backdrop>
                : null
          }
          <Navbar
            closeAuthForm={this.closeAuthForm} 
            showAuthForm={this.showAuthForm}
          />
          <Alert 
            alertType='info'
            alertText={INFO}
          /> 
          <Report />
        </Fragment>
    )
  }  
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
	return {
    autoLogin: () => dispatch(autoLogin()),
    authClearError: () => dispatch(authClearError())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

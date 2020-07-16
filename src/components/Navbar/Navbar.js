import React from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/auth'

const Navbar = props => {
    return(
        <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
            <div className='navbar-brand'>
                Отчет
            </div>
            {
                props.token 
                    ? 
                    <Button 
                        variant="dark" 
                        className='ml-auto mr-1' 
                        onClick={() => { 
                            props.logout()
                            props.closeAuthForm() 
                        }}
                    >Выйти</Button>
                    :
                    <Button 
                        variant="dark" 
                        className='ml-auto mr-1' 
                        onClick={props.showAuthForm}
                    >Войти</Button>
            }
        </nav> 
    )
}

function mapStateToProps(state) {
    return  {
        token: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

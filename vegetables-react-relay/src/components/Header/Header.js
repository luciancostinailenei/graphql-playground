import React, { Component }          from 'react'
import { Link }                      from 'react-router-dom'
import { withRouter }                from 'react-router'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants'

import                                    './Header.css'

class Header extends Component {

    render() {  
        const userId = localStorage.getItem(GC_USER_ID)

        return (
        <div className='Header flex pa1 justify-between nowrap levi9blue'>
            {/* this is the Link component from react-router-dom */}
            <Link 
                to='/' 
                className='fw7 Header__action-link ml1 no-underline white'
            >
                Cool Tech Links
            </Link>

            <div className='Header__action-links'>
                { 
                    userId && 
                    <Link 
                        to='/create' 
                        className='Header__action-link no-underline white'
                    >
                        submit
                    </Link>
                }

                {
                    userId ?
                        <a className='pointer white' onClick={() => {
                            localStorage.removeItem(GC_USER_ID)
                            localStorage.removeItem(GC_AUTH_TOKEN)
                            this.props.history.push(`/`)
                        }}>logout</a> 
                        :
                        <Link 
                            to='/login' 
                            className='ml1 no-underline white'>
                            login
                        </Link>
                }
            </div>
        </div>
        )   
    }

}

export default withRouter(Header)


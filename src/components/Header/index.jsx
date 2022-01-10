import React, {useContext} from 'react'
import { AuthContext } from '../../contexts/auth'

import './styles.scss'

import { FiLogOut } from 'react-icons/fi'

export function Header() {

    const { logout, login } = useContext(AuthContext);

    return (
        <div className="headerContainer">
            {
                login ?
                <button onClick={logout}>
                    <FiLogOut className="icon"/>
                    Disconnect
                </button>
                :
                ""
            }
        </div>
    )
}
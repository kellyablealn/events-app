import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import UnauthModal from '../../features/auth/UnauthModal';

const PrivateRoute = ({component: Component, prevLocation, ...rest}) => {
    const { authenticated } = useSelector(state => state.auth);

    return (
        <Route {...rest} 
            render={
                (props) => 
                    authenticated 
                    ? <Component {...props} />
                    : <UnauthModal { ...props} />
            }
        />

    )
}

export default PrivateRoute;

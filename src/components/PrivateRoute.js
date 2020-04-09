import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LayoutItem from './Layoutitem'
import { useAuth } from './../context/auth';

const PrivateRoute = ({ compoenent: Component, ...rest }) => {
    const { authTokens } = useAuth();
    return (
        <Route
            {...rest}
            render={props =>
                authTokens ? (
                    <LayoutItem>
                    <Component {...props} />
                    </LayoutItem>
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    )
}


export default PrivateRoute;
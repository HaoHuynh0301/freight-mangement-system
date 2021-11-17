import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";


export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render = {
            (props) => {
                const token = auth.isAuthenticate();
                if(token) {
                    return(
                        <Component {...props}/>
                    );
                } else {
                    return(
                        <Redirect to = {
                            {
                                pathname: "/sign-in",
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    );
                }
            }
        }>
        </Route>
    );
}
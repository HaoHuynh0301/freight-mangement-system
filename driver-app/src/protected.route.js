import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import jwt_decode from "jwt-decode";


export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render = {
            (props) => {
                const token = auth.isAuthenticate();
                let dateNow = new Date();
                console.log((dateNow.getTime()/1000) - ((jwt_decode(token).exp)))
                if(token && ((jwt_decode(token).exp)) < (dateNow.getTime()/1000)) {
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
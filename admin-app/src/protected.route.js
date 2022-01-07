import React, { Component } from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./auth";
import jwt_decode from "jwt-decode";


export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render = {
            (props) => {
                const token = auth.isAuthenticate();
                let dateNow = new Date();
                if(token !== null && ((jwt_decode(token).exp)) < (dateNow.getTime()/1000)) {
                    alert('PHIÊN ĐĂNG NHẬP ĐÃ HẾT HẠN, VUI LÒNG ĐĂNG NHẬP LẠI!');
                    return(
                        <Navigate to = {
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
                        <Navigate to = {
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
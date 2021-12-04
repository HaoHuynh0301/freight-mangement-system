import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Link,
    withRouter 
} from "react-router-dom";

class NotFoundPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <body style = {{
                backgroundColor: '#95c2de'
            }}>
                <div style = {{
                    backgroundColor: '#95c2de',
                    margin: 'auto',
                    height: '100%',
                    width: '600px',
                    position: 'relative',
                }}>
                    <div style = {{
                        color: '#ffffff',
                        fontFamily: 'Nunito Sans',
                        fontSize: '11rem',
                        position:'absolute',
                        left: '20%',
                        top: '8%',
                    }}>4</div>
                    <i className="far fa-question-circle fa-spin" />
                    <div style = {{
                        color: '#ffffff',
                        fontFamily: 'Nunito Sans',
                        fontSize: '11rem',
                        position:'absolute',
                        left: '68%',
                        top: '8%',
                    }}>4</div>
                    <div style = {{
                        textAlign: 'center',
                        fontFamily: 'Nunito Sans',
                        fontSize: '1.6rem',
                        position:'absolute',
                        left: '16%',
                        top: '45%',
                        width: '75%',
                    }}>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="#">home</a> and try from there.</p></div>
                </div>
            </body>
            
        );
    }
}

export default NotFoundPage;
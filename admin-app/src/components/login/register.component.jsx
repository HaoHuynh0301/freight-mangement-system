import React from "react";
import { withStyles } from '@material-ui/styles';
import st from './styles/register.style';

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let {classes} = this.props;
        return(
            <div>
                Register
            </div>
        );
    }
}

export default withStyles(st)(RegisterComponent);
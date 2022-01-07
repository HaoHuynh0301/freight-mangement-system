import React from 'react';
import { withStyles } from '@material-ui/styles';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        let { classes } = this.props;
        return(
            <div className = {classes.container}>
                
            </div>
        );
    }
}

export default withStyles(st)(LoginComponent);
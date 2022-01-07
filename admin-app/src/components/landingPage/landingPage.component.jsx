import React from 'react';
import { withStyles } from '@material-ui/styles';
import st from './styles/landingPage.style';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { classes } = this.props;
        return (
            <div>

            </div>
        );
    }
}

export default withStyles(st)(LandingPage);
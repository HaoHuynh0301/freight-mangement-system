import React, { Component } from "react";
import  {
    DoubleNavigationPage
} from '../components'

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <DoubleNavigationPage />
            </div>
        );
    }
}

export default HomePage;
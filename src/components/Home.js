import React, {Component} from 'react';
import {Row, Menu, Icon, Button} from 'antd';
import {connect} from "react-redux";
import Tourists from './Tourists';
import Flights from './Flights';

import 'antd/dist/antd.css';


const container = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 50px 0 50px'
};

const row_style ={
    padding: "5px"
};

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            current: 'tourists',
        };
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render(){

        const {current} = this.state;
        return(
            <div style={container}>
                <Row style={row_style}>
                    <Menu onClick={this.handleClick} mode="horizontal" selectedKeys={this.state.current}>
                        <Menu.Item key="tourists" >
                            <Icon type="user" />
                            Tourists
                        </Menu.Item>
                        <Menu.Item key="flights">
                            <Icon type="compass" />
                            Flights
                        </Menu.Item>
                    </Menu>
                </Row>
                <Row style={row_style}>
                    {current === 'tourists' ? (
                        <Tourists/>
                    ) : (
                        <Flights/>
                    )}
                </Row>
            </div>
        );
    }
}


// function mapStateToProps(state){
//     return{
//         map: state.map
//     };
// }

export default connect(null, {})(Home);

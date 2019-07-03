import React, {Component} from 'react';
import { Table, Divider, Button, Modal, Select } from 'antd';
import {connect} from "react-redux";
import { reduxForm, Field } from "redux-form";
import {fetchTourists, fetchFlights, addFlight, updateFlightsList, deleteFlight, deleteTouristFromCurrentFlight, setCurrentFlight, addTouristToCurrentFlight} from '../actions';
import {renderField, renderButton} from "../utils";

import 'antd/dist/antd.css';


class Flights extends Component {


    constructor(props){
        super(props);

        this.state = {
            visible: false,
            selectedTouristId: null,
        };

        this.handleSelectNewTourist = this.handleSelectNewTourist.bind(this);
        this.addNewTouristToFlight = this.addNewTouristToFlight.bind(this);

    }

    componentDidMount() {
        this.props.fetchFlights();
        this.props.fetchTourists();
    }

    handleEditTourists(flight){
        this.props.setCurrentFlight(flight);
        this.showModal();
    }

    handleDeleteFlight(flight){
        this.props.deleteFlight(flight);
    }

    handleDeleteTouristFromFlight(tourist){
        this.props.deleteTouristFromCurrentFlight(this.props.currentFlight, tourist);
    }

    handleSelectNewTourist(value){
        this.setState({selectedTouristId: value});
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
        this.props.updateFlightsList(this.props.currentFlight);
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    renderTouristsOptions(){
        return this.props.tourists.map(tourist =>
            <Select.Option value={tourist.key}>{tourist.name} {tourist.surname}</Select.Option>
        );
    }
    addNewTouristToFlight(){
        this.props.addTouristToCurrentFlight(this.props.tourists.find(tourist => tourist.key === this.state.selectedTouristId));
    }

    render(){

        const {currentFlight} = this.props;
        const { handleSubmit } = this.props;

        if(!this.props.tourists || !this.props.flights){
            return(
                <div>
                    Loading...
                </div>
            );
        }
        return(
            <div>

                <Table columns={this.flightsColumns} dataSource={this.props.flights} />


                <Modal
                    title={`Editing ${currentFlight.departureDatetime} -> ${currentFlight.arrivalDatetime}`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Table columns={this.touristsColumns} dataSource={currentFlight.tourists} />

                    <p>Add tourist</p>
                    <Select style={{ width: 400 }} onChange={this.handleSelectNewTourist}>
                        {this.renderTouristsOptions()}
                    </Select>
                    <Button onClick={this.addNewTouristToFlight}>Add new tourist</Button>
                </Modal>

                <form onSubmit={handleSubmit(this.props.addFlight)}>
                    <div style={{display: "flex", flexFlow: "row wrap", alignItems: "center"}}>
                        <Field name="departureDatetime" type="text" component={renderField} label="Departure"/>
                        <Field name="arrivalDatetime" type="text" component={renderField} label="Arrival"/>
                        <Field name="numberOfSeats" type="text" component={renderField} label="Seats" />
                        <Field name="price" type="text" component={renderField} label="Price" />
                    </div>
                    <Button type='primary' htmlType='submit' style={{marginTop: "20px"}}>Add flight</Button>

                </form>
            </div>
        );
    }

    touristsColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.handleDeleteTouristFromFlight(record)}>Delete tourist</Button>
                </span>
            ),
        },
    ];


    flightsColumns = [
        {
            title: 'Departure date',
            dataIndex: 'departureDatetime',
            key: 'departureDatetime',
        },
        {
            title: 'Arrival date',
            dataIndex: 'arrivalDatetime',
            key: 'arrivalDatetime',
        },
        {
            title: 'Seats',
            dataIndex: 'numberOfSeats',
            key: 'numberOfSeats',
        },
        {
            title: 'Ticket price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.handleEditTourists(record)}>Edit tourists</Button>
                    <Divider type="vertical" />
                    <Button onClick={() => this.handleDeleteFlight(record)}>Delete flight</Button>
                </span>
            ),
        },
    ];
}


function mapStateToProps(state){
    return{
        tourists: state.tourists,
        currentFlight: state.currentFlight,
        flights: state.flights
    };
}


export default connect(mapStateToProps, { fetchTourists, fetchFlights, updateFlightsList, addFlight, deleteFlight, deleteTouristFromCurrentFlight,
    setCurrentFlight, addTouristToCurrentFlight})(
    reduxForm({form: "TouristForm"})(Flights));



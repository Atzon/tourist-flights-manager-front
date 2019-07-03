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
            selectedFlightId: null,
        };

        this.handleSelectNewFlight = this.handleSelectNewFlight.bind(this);
        this.addNewFlightToTourist = this.addNewFlightToTourist.bind(this);

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

    handleDeleteFlightFromTourist(flight){
        this.props.deleteFlightFromCurrentTourist(this.props.currentTourist, flight);
    }

    handleSelectNewFlight(value){
        console.log(`selected ${value}`);
        this.setState({selectedFlightId: value});
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
        this.props.updateTouristsList(this.props.currentTourist);
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    renderFlightsOptions(){
        console.log(this.props.flights);
        return this.props.flights.map(flight =>
            <Select.Option value={flight.key}>Departure {flight.departureDatetime} Arrival {flight.arrivalDatetime}</Select.Option>
        );
    }
    addNewFlightToTourist(){
        this.props.addFlightToCurrentTourist(this.props.flights.find(flight => flight.key === this.state.selectedFlightId));
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

                    {/*<p>Avalible flights</p>*/}
                    {/*<Select style={{ width: 400 }} onChange={this.handleSelectNewFlight}>*/}
                        {/*{this.renderFlightsOptions()}*/}
                    {/*</Select>*/}
                    {/*<Button onClick={this.addNewFlightToTourist}>Add new flight</Button>*/}
                </Modal>

                {/*<form onSubmit={handleSubmit(this.props.addTourist)}>*/}
                    {/*<div style={{display: "flex", flexFlow: "row wrap", alignItems: "center"}}>*/}
                        {/*<Field name="name" type="text" component={renderField} label="Name"/>*/}
                        {/*<Field name="surname" type="text" component={renderField} label="Surname"/>*/}
                        {/*<Field name="gender" type="text" component={renderField} label="Gender" />*/}
                        {/*<Field name="country" type="text" component={renderField} label="Country" />*/}
                        {/*<Field name="notes" type="text" component={renderField} label="Notes"/>*/}
                        {/*<Field name="birthdate" type="text" component={renderField} label="Birthday"/>*/}
                    {/*</div>*/}
                    {/*<Button type='primary' htmlType='submit' style={{marginTop: "20px"}}>Add tourist</Button>*/}

                {/*</form>*/}
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
                    <Button onClick={() => this.handleEditFlights(record)}>Edit flights</Button>
                    <Divider type="vertical" />
                    <Button onClick={() => this.handleDeleteFlight(record)}>Delete tourist</Button>
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



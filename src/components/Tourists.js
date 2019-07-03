import React, {Component} from 'react';
import { Table, Divider, Button, Modal, Select } from 'antd';
import {connect} from "react-redux";
import { reduxForm, Field } from "redux-form";
import {fetchTourists, fetchFlights, addTourist, updateTouristsList, deleteTourist, deleteFlightFromCurrentTourist, setCurrentTourist, addFlightToCurrentTourist} from '../actions';
import {renderField, renderButton} from "../utils";

import 'antd/dist/antd.css';


class Tourists extends Component {


    constructor(props){
        super(props);

        this.state = {
            visible: false,
            selectedTouristId: null,
        };

        this.handleSelectNewFlight = this.handleSelectNewFlight.bind(this);
        this.addNewFlightToTourist = this.addNewFlightToTourist.bind(this);

    }

    componentDidMount() {
        this.props.fetchFlights();
        this.props.fetchTourists();
    }

    handleEditFlights(tourist){
        this.props.setCurrentTourist(tourist);
        this.showModal();
    }

    handleDeleteTourist(tourist){
        this.props.deleteTourist(tourist);
    }

    handleDeleteFlightFromTourist(flight){
        this.props.deleteFlightFromCurrentTourist(this.props.currentTourist, flight);
    }

    handleSelectNewFlight(value){
        console.log(`selected ${value}`);
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
        this.props.addFlightToCurrentTourist(this.props.flights.find(flight => flight.key === this.state.selectedTouristId));
    }

    render(){

        const {currentTourist} = this.props;
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

                <Table columns={this.touristsColumns} dataSource={this.props.tourists} />


                <Modal
                    title={`Editing ${currentTourist.name} ${currentTourist.surname}`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Table columns={this.flightsColumns} dataSource={currentTourist.flights} />

                    <p>Avalible flights</p>
                    <Select style={{ width: 400 }} onChange={this.handleSelectNewFlight}>
                        {this.renderFlightsOptions()}
                    </Select>
                    <Button onClick={this.addNewFlightToTourist}>Add new flight</Button>
                </Modal>

                <form onSubmit={handleSubmit(this.props.addTourist)}>
                    <div style={{display: "flex", flexFlow: "row wrap", alignItems: "center"}}>
                    <Field name="name" type="text" component={renderField} label="Name"/>
                    <Field name="surname" type="text" component={renderField} label="Surname"/>
                    <Field name="gender" type="text" component={renderField} label="Gender" />
                    <Field name="country" type="text" component={renderField} label="Country" />
                    <Field name="notes" type="text" component={renderField} label="Notes"/>
                    <Field name="birthdate" type="text" component={renderField} label="Birthday"/>
                    </div>
                    <Button type='primary' htmlType='submit' style={{marginTop: "20px"}}>Add tourist</Button>

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
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: 'Birth date',
            dataIndex: 'birthdate',
            key: 'birthdate',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.handleEditFlights(record)}>Edit flights</Button>
                    <Divider type="vertical" />
                    <Button onClick={() => this.handleDeleteTourist(record)}>Delete tourist</Button>
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.handleDeleteFlightFromTourist(record)}>Delete flight</Button>
                </span>
            ),
        },
    ];
}


function mapStateToProps(state){
    return{
        tourists: state.tourists,
        currentTourist: state.currentTourist,
        flights: state.flights
    };
}


export default connect(mapStateToProps, { fetchTourists, fetchFlights, updateTouristsList, addTourist, deleteTourist, deleteFlightFromCurrentTourist,
    setCurrentTourist, addFlightToCurrentTourist})(
    reduxForm({form: "TouristForm"})(Tourists));



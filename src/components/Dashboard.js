import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserData } from '../actions';
import { Card, CardSection, Button } from './common';

class Dashboard extends Component {
  componentWillMount() {
    this.setState({ userData: {} });
    this.props.fetchUserData();
  }

  addAttendance() {

  }

  addExpenseManagerDetail() {

  }

  addReminder() {

  }

  render() {
    console.log('here', this.state);
    return (
      <Card>
        <CardSection>
          <Button onPress={this.addAttendance.bind(this)}>
            Add New Attendance
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.addExpenseManagerDetail.bind(this)}>
            Add New Expense Detail
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.addReminder.bind(this)}>
            Add New Reminder
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.HomeReducer.isLoading,
  error: state.HomeReducer.error,
  userInfo: state.HomeReducer.data,
});

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => dispatch(fetchUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

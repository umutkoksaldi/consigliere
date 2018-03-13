import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
    render() {
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button>
                        Save Changes
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default connect(null)(EmployeeEdit);

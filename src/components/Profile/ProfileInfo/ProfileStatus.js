import React from 'react';
// import styles from './ProfileStatus.module.css';
// import { findAllByDisplayValue } from '@testing-library/react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.target.value,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            });
        }
        // let a = this.state;
        // let b = this.props;
    }

    render() {
        return (
            <div>
                {!this.state.editMode && (
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || '------'}
                        </span>
                    </div>
                )}

                {this.state.editMode && (
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            value={this.state.status}
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default ProfileStatus;

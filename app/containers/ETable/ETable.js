import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { configurationActions } from 'actions';
import { connect } from 'react-redux';
import './style.scss';

class ETable extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading });
  }

    handleChange=(pageSize) => {
      const { dispatch } = this.props;
      dispatch(configurationActions.pageDefault(pageSize));
    };

    render() {
      return (
        <ReactTable
          key={this.props.pageSize}
          data={this.props.data}
          columns={this.props.columns}
          defaultPageSize={this.props.pageSize}
          className="-striped -highlight react_table"
          onPageSizeChange={this.handleChange}
          filterable
          loading={this.state.loading}
        />
      );
    }
}

function mapStateToProps(state) {
  return {
    pageSize: state.configurations.size
  };
}

export default connect(mapStateToProps)(ETable);

import React from 'react';
import DetailTask from '../components/DetailTask';


class CreateTask extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h3>New Task</h3>
        <DetailTask isCreate/>
      </div>
    )
  }
}

export default CreateTask

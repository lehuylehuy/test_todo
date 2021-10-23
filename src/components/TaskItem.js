import React from "react";
import { Button, Checkbox } from 'antd'
import DetailTask from './DetailTask'

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      isOpenDetail: false,
    }
  }

  componentWillUnmount() {
    this.setState({ check: false });
  }

  renderItem = () => {
    const { data, selectTask, removeTask, updateTask } = this.props;
    const { check, isOpenDetail } = this.state;

    return (
      <>
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: 20, padding: 10 }}>
          <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'start', alignItems: 'center' }}>
            <Checkbox checked={check} onChange={() => this.setState({ check: !check }, () => selectTask(data, this.state.check))}></Checkbox>
            <strong style={{ marginLeft: 10 }}>{data?.title || ''}</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: "row" }}>
            <Button
              style={{ backgroundColor: '#94CE7F', width: "100%" }}
              onClick={() => this.setState({ isOpenDetail: !isOpenDetail })}
            > Detail </Button>

            <Button
              style={{ backgroundColor: '#FD9696', width: "100%", marginLeft: 8 }}
              onClick={() => removeTask(data)}
            > Remove </Button>
          </div>
        </div>
        {isOpenDetail && <DetailTask data={data} updateTask={(newData, oldData) => this.setState({ isOpenDetail: false }, () => updateTask(newData, oldData))} closeDetail={() => this.setState({ isOpenDetail: false })} />}
      </>
    )
  }

  render() {
    return (
      <div style={{ width: '100%', borderWidth: 1, borderRadius: 3, backgroundColor: '#E6E6E6' }}>
        {this.renderItem()}
      </div>
    )
  }

}
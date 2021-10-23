import React from "react";
import { Input, DatePicker, Select, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import moment from "moment";
moment.locale('vi');

const Option = Select.Option;
const { TextArea } = Input;

const listPiority = ["low", "nomal", "high"]

class DetailTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props?.data?.title || '',
      description: props?.data?.description || '',
      dueDate: props?.isCreate ? moment() : props?.data?.dueDate ? moment(props.data.dueDate) : '',
      piority: props?.isCreate ? 'nomal' : props?.data?.piority || '',
    };
  }

  createTask = (item) => {
    let tasks = localStorage.getItem('list_task');
    tasks = tasks && JSON.parse(tasks) || [];

    tasks.push(item);

    tasks.sort((a, b) => {
      if (moment(a.dueDate) > moment(b.dueDate)) {
        return 1;
      }
      if (moment(a.dueDate) < moment(b.dueDate)) {
        return -1;
      }
      return 0;
    });

    localStorage.setItem('list_task', JSON.stringify(tasks));
    this.props.history.push('/')
  }

  render() {
    const { title, description, dueDate, piority } = this.state;
    const { updateTask } = this.props;

    return (
      <div style={{ width: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: "#FAFAFA" }}>
        <Input
          placeholder="Add new task ..."
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <div style={{ marginTop: 20, width: '100%' }}>
          <strong style={{ fontSize: 15 }}>Description</strong>
          <TextArea
            style={{ marginTop: 5 }}
            autoSize={{ minRows: 5, maxRows: 5 }}
            onChange={e => this.setState({ description: e.target.value })}
            value={description}
          />
        </div>

        <div style={{ marginTop: 20, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{}}>
            <p style={{ fontSize: 15, fontWeight: "bold" }}>Due Date</p>
            <DatePicker format={"DD MMM YYYY"} showTime value={moment(dueDate)} onChange={(date, dateString) => {
              this.setState({ dueDate: date.toJSON() });
            }} />
          </div>

          <div style={{}}>
            <p style={{ fontSize: 15, fontWeight: "bold" }}>Piority</p>
            <Select
              onChange={piority => this.setState({ piority })}
              style={{ width: 300 }}
              value={piority}>
              {listPiority.map(item => <Option key={item} value={item}>{item}</Option>)}
            </Select>
          </div>

          <div>

          </div>
        </div>

        <Button
          style={{ backgroundColor: '#1DC460', borderColor: '#389e0d', width: "100%", marginTop: 30 }}
          onClick={() => this.props?.isCreate ? this.createTask(this.state) : updateTask(this.state, this.props.data)}
        > <strong style={{ textColor: '#000' }}>{this.props?.isCreate ? 'Add' : 'Update'}</strong> </Button>
      </div>
    )
  }
}
export default withRouter(DetailTask);
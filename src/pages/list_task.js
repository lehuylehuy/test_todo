import React from "react";
import TaskItem from "../components/TaskItem";
import { Button, Input } from "antd";
import moment from "moment";
moment.locale('vi');

export default class ListTask extends React.Component {
  constructor(props) {
    super(props);
    let tasks = localStorage.getItem('list_task');
    this.state = {
      tasks: tasks && JSON.parse(tasks) || [],
      listTaskSelected: [],
      isOpenActionBox: false,
      keyword: '',
    };
  }

  search = (keyword) => {
    const { tasks } = this.state;
    let tasksData = localStorage.getItem('list_task');
    tasksData = tasksData && JSON.parse(tasksData) || []
    let tasksSearch = tasksData.filter(task => task.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
    this.setState({ tasks: tasksSearch })
  }

  removeTask = (dataTask) => {
    const { listTaskSelected } = this.state;
    let tasks = this.state.tasks.filter(task => {
      if (dataTask) return task !== dataTask
      else return !listTaskSelected.includes(task)
    });
    !dataTask && this.setState({ listTaskSelected: [] })
    this.setState({ tasks }, () => localStorage.setItem('list_task', JSON.stringify(tasks)));
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isOpenActionBox,
      listTaskSelected, keyword
    } = this.state;

    if (prevState.listTaskSelected.length !== listTaskSelected.length) {
      if (prevState.listTaskSelected.length === 0 && listTaskSelected.length === 1) {
        this.setState({ isOpenActionBox: true })
      }
      if (prevState.listTaskSelected.length > 0 && listTaskSelected.length === 0)
        this.setState({ isOpenActionBox: false })
    }
    if (prevState.keyword !== keyword) this.search(keyword);

  }

  updateTask = (newData, oldData) => {
    let tasks = this.state.tasks.map(task => {
      if (task == oldData) return newData
      else return task
    });

    tasks.sort((a, b) => {
      if (moment(a.dueDate) > moment(b.dueDate)) {
        return 1;
      }
      if (moment(a.dueDate) < moment(b.dueDate)) {
        return -1;
      }
      return 0;
    });

    this.setState({ tasks: tasks }, () => localStorage.setItem('list_task', JSON.stringify(tasks)));
  }

  selectTask = (task, check) => {
    let listTaskSelected = this.state.listTaskSelected;

    if (check) listTaskSelected = listTaskSelected.concat([task])
    else listTaskSelected = listTaskSelected.filter(taskSelect => taskSelect !== task)

    this.setState({ listTaskSelected: listTaskSelected });
  }

  render() {
    const { tasks, isOpenActionBox, listTaskSelected, keyword } = this.state;
    return (

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 600 }}>
          <Input
            placeholder="Type to search..."
            onChange={e => this.setState({ keyword: e.target.value })}
            value={keyword}
            allowClear
          />
          {isOpenActionBox && (
            <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: 20, padding: 10 }}>
              <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'start', alignItems: 'center' }}>
                <span>Bulk Action:</span>
              </div>
              <div style={{ display: 'flex', flexDirection: "row" }}>
                <Button
                  style={{ backgroundColor: '#389e0d', borderColor: '#389e0d', width: "100%" }}
                > Done </Button>

                <Button
                  style={{ backgroundColor: '#389e0d', borderColor: '#389e0d', width: "100%", marginLeft: 8 }}
                  onClick={() => this.removeTask()}
                > Remove </Button>
              </div>
            </div>
          )}
          {tasks.map((item, idx) => <TaskItem data={item} key={idx} selectTask={this.selectTask} updateTask={this.updateTask} removeTask={this.removeTask} />)}

        </div>
      </div>
    )
  }
}
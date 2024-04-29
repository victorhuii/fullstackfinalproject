import React, {useState} from "react";
import ChartistGraph from "react-chartist";

// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function TaskList({tasks, setTasks}) {

  const handleCheckChange = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Card.Body>
      <Table className="table-full-width">
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>
                <Form.Check className="mb-1 pl-0">
                  <Form.Check.Label>
                    <Form.Check.Input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => handleCheckChange(task.id)}
                    />
                    <span className="form-check-sign"></span>
                  </Form.Check.Label>
                </Form.Check>
              </td>
              <td>{task.text}</td>
              <td className="td-actions text-right">
                <OverlayTrigger overlay={<Tooltip>{task.removeTooltip}</Tooltip>}>
                  <Button className="btn-simple btn-link p-1" variant="danger" onClick={() => removeTask(task.id)}>
                    <i className="fas fa-times"></i>
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  );
}

function Dashboard() {
  const[tasks, setTasks] = useState([ 
    {
      id: 1,
      text: 'Task 1 blah blah blah blah blah',
      checked: false,
      editTooltip: 'Edit Task',
      removeTooltip: 'Remove',
    },
    {
      id: 2,
      text: 'Task 2 blah blah blah blah blah',
      checked: false,
      editTooltip: 'Edit Task',
      removeTooltip: 'Remove',
    },
  ]);

  const [dailyTime, setDailyTime] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');

  const handleStartStop = () => {
    if (!isActive) {
      const id = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      setIntervalId(id);
      setIsActive(true);
    } else {
      clearInterval(intervalId);
      setIsActive(false);
    }
  };

  const handleEndDay = () => {
    const completedCount = tasks.filter(task => task.checked).length;
    const updatedWeeklyData = [...weeklyData];

    const timeSpentToday = timer;
    setDailyTime([...dailyTime, timeSpentToday]);
  
    updatedWeeklyData.push([completedCount]);

    if (updatedWeeklyData.length === 8) {
      setWeeklyData([[completedCount]]);
    } else {
      setWeeklyData(updatedWeeklyData);
    }

    const resetTasks = tasks.map(task => ({ ...task, checked: false }));
    setTasks(resetTasks);
    clearInterval(intervalId);
    setIsActive(false);
    setTimer(0);
  };

  const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const addTask = () => {
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = {
      id: newId,
      text: newTaskText,
      checked: false,
      editTooltip: 'Edit Task',
      removeTooltip: 'Remove',
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');  
  };

  const completedTasksCount = tasks.filter(task => task.checked).length;
  const incompleteTasksCount = tasks.length - completedTasksCount;

  return (
    <>
      <Container fluid>
        <Row>

        <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
                <Form inline>
                  <div style={{fontSize: '24px', fontWeight: 'bold', padding: '20px', background: '#f0f0f0', borderRadius: '10px' }}>
                    Timer: {formatTime(timer)}
                  </div>
                  <Button variant={isActive ? "danger" : "success"} onClick={handleStartStop}>
                    {isActive ? 'Stop' : 'Resume'}
                  </Button>
                  <Button variant="secondary" onClick={handleEndDay} style={{ marginLeft: '10px' }}>End Day</Button>
                </Form>
              </Card.Header>
              <Card.Body>
                {}
              </Card.Body>
            </Card>
          </Col>

          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Your Weekly Summary</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                <ChartistGraph
                    data={{
                      labels: Array.from({length: weeklyData.length}, (_, i) => `Day ${i + 1}`),
                      series: [weeklyData.map(dayData => dayData[0])]
                    }}
                    type="Bar"
                    options={{
                      low: 0,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      seriesBarDistance: 10,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i> Focus Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Commitment Statistic</Card.Title>
                <p className="card-category">Completed vs Incompleted Tasks</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth" id="chartPreferences">
                  <ChartistGraph
                    data={{
                      labels: [`${Math.round(completedTasksCount / tasks.length * 100)}%`, `${Math.round(incompleteTasksCount / tasks.length * 100)}%`],
                      series: [completedTasksCount, incompleteTasksCount],
                    }}
                    type="Pie"
                    options={{
                      donut: true,
                      donutWidth: 60,
                      startAngle: 270,
                      total: tasks.length * 2,
                      showLabel: true
                    }}
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Completed 
                  <i className="fas fa-circle text-danger"></i>
                  Incomplete
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Daily Time Spent Working</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: Array.from({ length: dailyTime.length }, (_, i) => `Day ${i + 1}`),
                      series: [dailyTime],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 5,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      ["screen and (max-width: 640px)", {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      }],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                 
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">add new task here</p>
                <Form inline>
                  <Form.Control
                    type="text"
                    placeholder="Add new task..."
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <Button onClick={addTask} variant="primary" size="sm">Add Task</Button>
                </Form>
              </Card.Header>
              <TaskList tasks={tasks} setTasks={setTasks} />
          
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

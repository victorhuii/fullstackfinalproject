import React from "react";
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

function TaskList() {
  const tasks = [
    {
      id: 1,
      text: 'Sign contract for "What are conference organizers afraid of?"',
      checked: false,
      editTooltip: 'Edit Task',
      removeTooltip: 'Remove',
    },
    {
      id: 2,
      text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
      checked: true,
      editTooltip: 'Edit Task',
      removeTooltip: 'Remove',
    },
    // Add more tasks as needed
  ];

  return (
    <Card.Body>
      <div className="table-full-width">
        <Table>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>
                  <Form.Check className="mb-1 pl-0">
                    <Form.Check.Label>
                      <Form.Check.Input
                        defaultValue=""
                        type="checkbox"
                        checked={task.checked}
                        onChange={() => {}} // Define change handler if needed
                      ></Form.Check.Input>
                      <span className="form-check-sign"></span>
                    </Form.Check.Label>
                  </Form.Check>
                </td>
                <td>{task.text}</td>
                <td className="td-actions text-right">
                  <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-edit-${task.id}`}>{task.editTooltip}</Tooltip>}
                  >
                    <Button className="btn-simple btn-link p-1" type="button" variant="info">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-remove-${task.id}`}>{task.removeTooltip}</Tooltip>}
                  >
                    <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                      <i className="fas fa-times"></i>
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card.Body>
  );
}



function Dashboard() {
  TaskList()
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Your Weekly Summary</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                      ],
                      series: [
                        [1, 3, 5, 7, 9], // need to make these to be variables
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 8,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
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
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Commitment Statistic</Card.Title>
                <p className="card-category">Time Locked in Vs Time off</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["40%", "60%",],
                      series: [40, 60],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Lock In <i className="fas fa-circle text-danger"></i>
                  Time off
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Monthly Performance</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        '1st Week',
                        '2nd Week',
                        '3rd Week',
                        '4th Week'
                      ],
                      series: [
                        [
                        '36',
                        '40',
                        '50',
                        '20'
                        ],
                      
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
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
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category"> Create an add Button here! ! !</p>
              </Card.Header>
              {TaskList()}
          
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
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

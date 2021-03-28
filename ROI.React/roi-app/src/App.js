import React from 'react';
import { Row, Col, Container, Tab, Tabs } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OptionTab from './components/OptionTab.js';
import ResultTab from './components/ResultTab.js';
var Config = require("./Config");


class App extends React.Component {
	constructor(props) {
		super(props);
		this.changeInvestmentSettings = this.changeInvestmentSettings.bind(this);
		this.changeOptionItems = this.changeOptionItems.bind(this);
		this.handleTabSelect = this.handleTabSelect.bind(this);
		//this.getRoiResultFromApi = this.getRoiResultFromApi.bind(this);

		this.state = {
			items: [],
			text: '1000000',
      activeTab: '1',
			investmentAmount: 1000000,
			returnInAud: '0',
			returnInUsd: '0',
			feeInAud: '0',
			feeInUsd: '0',
      investmentSettings : ''
		}
	}

	changeInvestmentSettings(invest) {
    	this.setState({investmentSettings: invest});
	}

	changeOptionItems(optionItems) {
    this.setState({items: optionItems});
  }

	handleTabSelect(key) {
    if (this.state.activeTab !== key)
    {
      this.setState({activeTab: key});
      
      if (key === '2') // ROI tab
      {
        const data = this.state.investmentSettings;
        this.getAllRoiResultFromApi(data);
      }
    }
  }

  getAllRoiResultFromApi(investSetting) {
    // GET request using fetch with error handling
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: investSetting
    };

    const apiUrl = Config.baseURL + '/roi';
    
    fetch(apiUrl, requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            this.setState({			
              returnInAud: String(data.investReturnInAud),
              returnInUsd: String(data.investReturnInUsd),
              feeInAud: String(data.feeInAud),
              feeInUsd: String(data.feeInUsd)
            });
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }  

	render() {
    return (
      <Container>
      <Row>
          <Col>
              <Tabs defaultActiveKey={1} 
                    id="controlled-tab-roi-option"
                    onSelect={this.handleTabSelect} >
                  <Tab eventKey={1} title="Investment Options">
                      <OptionTab investSetting={this.changeInvestmentSettings}/>
                  </Tab>
                  <Tab eventKey={2} title="ROI">
                      <ResultTab 
                      returnAud={this.state.returnInAud}
                      returnUsd={this.state.returnInUsd}
                      feeAud={this.state.feeInAud}
                      feeUsd={this.state.feeInUsd} />
                  </Tab>
              </Tabs>
          </Col>
      </Row>
      </Container>
    );
}
}

export default App;

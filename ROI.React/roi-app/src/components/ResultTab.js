import React from 'react';

class ResultTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			returnInAud: this.props.returnAud + ' AUD',
			returnInUsd: this.props.returnUsd + ' USD',
			feeInAud: props.feeAud + ' AUD',
			feeInUsd: props.feeUsd + ' USD',
		}
	}

	render() {
	    return (
	      <div>
	        <h3>ROI</h3>
	        <form>
				<table>
  				<tr>
    				<th colSpan="3">Projected Returns in 1 Year</th>
    				<th colSpan="1">Total Fees</th>
  				</tr>
  				<tr>
    				<td colSpan="3">
						<input style={{ width:"300px" }} readonly value={this.props.returnAud + ' AUD'} />
					</td>
    				<td colSpan="1">
						<input readonly value={this.props.feeUsd + ' USD'}/>
					</td>
  				</tr>
				</table>				
	        </form>
	      </div>
	    );
	}
}

export default ResultTab;
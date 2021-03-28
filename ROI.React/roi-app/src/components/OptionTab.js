
import React from 'react';

const InvestmentOptions = [
	"-- select --",
    "Cash investments",
    "Fixed interest" ,
    "Shares",
    "Managed funds",
    "Exchange traded funds (ETFs)",
    "Investment bonds",
    "Annuities",
    "Listed investment companies (LICs)",
    "Real estate investment trusts (REITs)"
  ];

const InvestOptionsItems = InvestmentOptions.map((item, index) => 
		<option key={index} value={index}>
			{item}
		</option>	
	);

class OptionTab extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeInvestmentAmount = this.onChangeInvestmentAmount.bind(this);
		this.onChangePercent = this.onChangePercent.bind(this);
		this.onChangeOption = this.onChangeOption.bind(this);
		this.onRemoveItemClick = this.onRemoveItemClick.bind(this);
		this.onAddItemClick = this.onAddItemClick.bind(this);
		this.getRoiSettings = this.getRoiSettings.bind(this);
		
		this.state = {
			investmentAmount: 1000000,
			availableAmount: 1000000,
			availablePercent: 100,
			
			items: [{ option: 0, percent: 0, myid: 0}],
			optionItems: [0],
			percentItems: [0],
		}
	}

	onChangeInvestmentAmount(e) {
    	//this.setState({text: e.target.value});
		const value = Number(e.target.value);
    	this.setState({investmentAmount: value});
		const roiSetting = this.getRoiSettings();
		if (roiSetting !== this.props.investSetting)
			this.props.investSetting(roiSetting);

		this.setState({availableAmount: value * this.state.availablePercent / 100 });				
	}

	onChangePercent(i, value) {
		let newItems = this.state.percentItems;
		const n = Number(value);
		const newAvailablePercent = this.state.availablePercent - n + newItems[i];
		newItems[i] = n;
		this.setState({percentItems: newItems});
		this.setState({availablePercent: newAvailablePercent})
		this.setState({availableAmount: this.state.investmentAmount * newAvailablePercent / 100})

		const roiSetting = this.getRoiSettings();
		if (roiSetting !== this.props.investSetting)
		this.props.investSetting(roiSetting);
	}

	onChangeOption(i, value) {
		let newItems = this.state.optionItems;
		newItems[i] = Number(value);
		this.setState({optionItems: newItems});
		const roiSetting = this.getRoiSettings();
		if (roiSetting !== this.props.investSetting)
			this.props.investSetting(roiSetting);
	}

	onRemoveItemClick(index, e) {
    	e.preventDefault();
		if (this.state.optionItems.length > 1)
		{
			if (this.state.percentItems[index]>0)
			{
				const newValue = this.state.availablePercent + this.state.percentItems[index];
				this.setState({availablePercent: newValue});	
				this.setState({availableAmount: this.state.investmentAmount * newValue /100});	
			}

			let newOptionItems = this.state.optionItems;
			newOptionItems.splice(index, 1);
			this.setState({optionItems: newOptionItems});

			let newPercentItems = this.state.percentItems;
			newPercentItems.splice(index, 1);
			this.setState({percentItems: newPercentItems});


			const roiSetting = this.getRoiSettings();
			if (roiSetting !== this.props.investSetting)
			this.props.investSetting(roiSetting);
		}
	}

	onAddItemClick(e) {
    	e.preventDefault();
		if (this.state.optionItems.length < 5)
		{
			this.setState(prevState => ({
				optionItems: [...prevState.optionItems, 0]
			  }));			
			this.setState(prevState => ({
				percentItems: [...prevState.percentItems, 0]
			  }));			
		}
	}

	getRoiSettings()
	{
		let result = {
			totalInvest : this.state.investmentAmount,
			items : []
		};
		this.state.optionItems.map((item, index) => 
		    result.items = result.items.concat([{option: item, 
				percent: this.state.percentItems[index]}])			 
		);
		return JSON.stringify(result);
	}

	render() {
	    return (
	      <div>
	        <h3>Options</h3>
	        <form>
			<lable>Investment Amount: </lable>
	        <input type="number" onChange={this.onChangeInvestmentAmount} 
			  	value={this.state.investmentAmount} />
			<br/>
			<lable>Available Amount: {this.state.availableAmount}</lable>
			<br/><br/>
			{
				this.state.optionItems.map((item, index) =>
					<div>
						<select value={item}
  							onChange={(e) => this.onChangeOption(index, e.target.value)} >
	  						{InvestOptionsItems}			
						</select>
						<label>&nbsp;&nbsp;</label>
						<input type="number" min="0" max="100" value={this.state.percentItems[index]} 
								onChange={(e) => this.onChangePercent(index, e.target.value)} />
						<label>&nbsp;&nbsp;</label>
						<button onClick={(e) => this.onRemoveItemClick(index, e)}>Delete</button>
						<br/>

					</div> 
				)					  
			}
			<br/>
			<button onClick={(e) => this.onAddItemClick(e)}>Add</button>
			</form>
	      </div>
	    );
	}
}

export default OptionTab;
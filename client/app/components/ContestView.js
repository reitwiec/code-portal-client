import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { ContestCard, Sidebar } from 'components';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('contestsStore')
@observer
class ContestView extends Component {
	componentDidMount() {
		this.props.contestsStore.fetchContests();
	}

	onClick = slug => this.props.history.push(`/contest/${slug}`);

	render() {
		const {
			contestsStore: { fetchContests, contests }
		} = this.props;
		return (
			<div className={this.props.className}>
				<h1>Contests</h1>
				<span id="contestpagetitle">Overview</span>
				<div id="contestsavail">
					{contests.map((contest, i) => (
						<ContestCard
							onClick={this.onClick}
							contest={contest}
							key={`contest_${i}`}
							joined={i % 4}
						/>
					))}
				</div>
			</div>
		);
	}
}

const test = keyframes`
0%{ 
	transform: translateX(-30px);
    opacity:0;
    }
100%{
	transform: translateX(0px);
    opacity:1;
    }
`;
const test1 = keyframes`
0%{ 
	transform: translateX(-20px);
    opacity:0;
    }
100%{
	transform: translateX(0px);
    opacity:1;
    }
`;

export default styled(withRouter(ContestView))`
	display: flex;
	flex-direction: column;

	justify-content: flex-end;

	#contestpagetitle {
		font-size: 20px;
		animation: ${test1} 0.8s 1 0s ease-in;
		padding-left: 2px;
		color: #dfdfe7;
		letter-spacing: 2px;
		text-align: left;
		font-size: 1.2em;
		font-weight: 400;
	}
	> h1 {
		animation: ${test} 0.8s 1 0s ease-in;

		font-weight: 600;
		color: #fff;
		text-align: left;
	}

	> div {
		padding-top: 2em;
	}

	#contestsavail {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		// justify-content: flex-end;
	}
`;

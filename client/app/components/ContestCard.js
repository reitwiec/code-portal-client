import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const colors = ['#b14aee', '#6a93ff', '#fb0083'];
const colors1 = ['#E3077A', '#5381FA', '#A937ED', '#F0B93F'];

import { ClockIcon, CalendarIcon } from 'components';
class ContestCard extends Component {
	render() {
		var startTime = new Date(this.props.contest.start).toString().split(' ');
		var endTime = new Date(this.props.contest.end).toString().split(' ');
		return (
			<div
				onClick={() => this.props.onClick(this.props.contest.slug)}
				className={this.props.className}>
				<h3>{this.props.contest.title}</h3>
				<p id="description">{this.props.contest.description}</p>
				<p id="ending">
					Contest Ends : {endTime[0]} {endTime[1]} {endTime[2]} {endTime[3]}{' '}
					{endTime[4]} IST
				</p>
				<div id="contents">
					<div id="clockcontent">
						<ClockIcon />
						<p id="clockcontentdets">
							<span id="timecontent"> Start Time (IST)</span>
							<br />
							<span>{startTime[4]}</span>
						</p>
					</div>
					<div id="clockcontent">
						<CalendarIcon />
						<p id="clockcontentdets">
							<span id="timecontent">Date</span>
							<br />
							<span>
								{startTime[1]} {startTime[2]} {startTime[3]}
							</span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const test = keyframes`
0%{ 
	transform: translateX(100px);
    opacity:0;
    }
100%{
	transform: translateX(0px);
    opacity:1;
    }
`;

export default styled(ContestCard)`
	overflow: hidden;
	animation: ${test} 0.8s 1 0s ease-out;
	margin: 0 2.5em 3.5em 0;
	border-radius: 10px;
	position: relative;
	background-color: #fff;
	min-height: 300px;
	height: auto;
	width: 27%;
	text-align: center;
	padding: 1em;
	padding-top: 5px;
	cursor: pointer;
	transition: 0.4s;
	:hover {
		border-radius: 20px;
		cursor: pointer;
		width: 30%;
		filter: drop-shadow(0px 22px 10px #101626);
	}
	filter: drop-shadow(0px 15px 10px #181e30);

	> h3 {
		text-transform: capitalize;
		color: #334272;
		font-size: 1.6em;
		font-weight: 700;
		letter-spacing: 0.3px;
	}
	> h3:after {
		content: '';
		display: block;
		margin: auto;
		width: 15%;
		padding-top: 3px;
		border-bottom: 3px solid ${({ joined }) => colors1[joined]};
	}

	> h4 {
		color: #fff;
		opacity: 0.65;
		font-size: 0.6em;
		font-weight: 600;
	}

	#description {
		margin-top: 15px;
		color: #334272;
		font-size: 0.75em;
		text-align: left;
		height: auto;
		min-height: 100px;
		font-weight: 600;
		letter-spacing: 0.2px;
	}

	#ending {
		margin-top: 15px;
		color: #8b8b8b;
		font-size: 0.7em;
		text-align: center;
		font-weight: 600;
	}
	#contents {
		left: 50%; /* position the left edge of the element at the middle of the parent */
		transform: translate(-50%, 0%);
		position: absolute;
		width: 103%;
		height: 80px;
		bottom: 0;
		background-color: ${({ joined }) => colors1[joined]};
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	#clockcontent {
		margin-top: 19px;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}
	#clockcontentdets {
		text-align: left;
		margin-left: 5px;
		color: #fff;
		font-weight: 600;
		font-size: 12px;
	}
	#timecontent {
		font-weight: 700;
		font-size: 14px;
	}
`;

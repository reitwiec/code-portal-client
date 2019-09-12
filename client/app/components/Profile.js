import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar, Button, Content } from 'components';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { avatarLarge } from 'assets';
import Contesticon from './Contesticon';

@inject('authStore', 'profileStore')
@observer
class Profile extends Component {
	componentDidMount() {
		this.props.profileStore.fetchProfile(this.props.username);
	}

	render() {
		const {
			profileStore: {
				profile: { name, username, email, organisation, regno, phone, rating },
				activities
			},
			authStore: { logout }
		} = this.props;

		return (
			<div className={this.props.className}>
				<Navbar />
				<Content>
					<div className="area">
						<div className="personal-data">
							<div>
								{email && (
									<div>
										<Button onClick={logout}>Sign Out</Button>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="area">
						<div className="stats">
							<div className="heading1">
								<span id="rank">
									<strong>{name}</strong>
								</span>
								<span className="fadebg1">Profile</span>
							</div>
							<div className="otherstat">
								<table className="tg">
									{username && (
										<tr>
											<td className="tg-0pky lead">Username :</td>
											<td className="tg-0pky follow">{username}</td>
										</tr>
									)}

									{rating && (
										<tr>
											<td className="tg-0pky lead">Rating :</td>
											<td className="tg-0pky follow">{rating}</td>
										</tr>
									)}
									{organisation && (
										<tr>
											<td className="tg-0pky lead">Organisation :</td>
											<td className="tg-0pky follow">{organisation}</td>
										</tr>
									)}
									{email && (
										<tr>
											<td className="tg-0pky lead">Email ID :</td>
											<td className="tg-0pky follow long">{email}</td>
										</tr>
									)}
									{phone && (
										<tr>
											<td className="tg-0pky lead">Phone :</td>
											<td className="tg-0pky follow">{phone}</td>
										</tr>
									)}
									{regno && (
										<tr>
											<td className="tg-0pky lead">Regno :</td>
											<td className="tg-0pky follow">{regno}</td>
										</tr>
									)}
								</table>
							</div>
						</div>
						<div className="container">
							<div className="heading">
								<h1>Activity</h1>
								<span className="fadebg1">{name}</span>
							</div>
							<div className="content">
								{activities.length === 0 ? (
									<div className="center-align">No activity yet</div>
								) : (
									activities.map((activity, i) => (
										<div className="activity" key={`activity_${i}`} />
									))
								)}
							</div>
						</div>
					</div>

					{/* <div className="beauty">
						<h1>Profile</h1>
					</div> */}
				</Content>
			</div>
		);
	}
}

var check = keyframes`
0%{
    transform: translateY(-30px);
    opacity:0;
}
100%{
    transform: translateY(0px);
    opacity:1;

}
`;
var check1 = keyframes`
0%{
    transform: translateY(30px);
    opacity:0;
}
100%{
    transform: translateY(0px);
    opacity:1;

}
`;

var Gradient = keyframes`
0% {
    background-position: 0% 50%
}
50% {
    background-position: 100% 50%
}
100% {
    background-position: 0% 50%
}
`;

export default styled(Profile)`
	.fadebg1 {
		padding-left: 10px;
		opacity: 0.23;
		color: white;
		font-weight: 900;
		z-index: -1;
		font-size: 70px;
		bottom: -30px;
		left: -10px;
		position: absolute;
	}
	.stats {
		border-radius: 5px;
		filter: drop-shadow(0px 15px 15px #181e30);
		background: #202942;
		width: 500px;
		height: 450px;
		border: none;
		animation: ${check1} 2s ease 1;
	}
	.details {
		font-weight: 400;
		font-size: 0.7em;
	}

	.area {
		margin-top: 30px;
		padding-right: 100px;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	${Button} {
		top: 20px;
		right: 10px;
		transition: 0.4s;
		position: relative;
		background: #fd6b9a;
	}
	${Button}:hover {
		background: #f77f6e;
	}

	.content {
		filter: drop-shadow(0px 5px 5px #282840);
	}
	.strength {
		margin-left: 60px;
		font-weight: 400;
		font-size: 0.7em;
	}
	.questions {
		position: relative;
		color: #dfdfe7;
		font-size: 1.3em;
		font-weight: 700;
		line-height: 1;
		padding: 10px;
		margin: 20px 0 20px 0;
		background: #2f2e4d;
		transition: 0.2s;
	}
	.questions:hover {
		color: #fff;
		background: #363559;
	}
	.container {
		border-radius: 5px;
		filter: drop-shadow(0px 15px 15px #181e30);
		background: #202942;

		width: 50%;
		border: none;
		animation: ${check} 2s ease 1;
	}
	border: none;

	.heading {
		overflow: hidden;
		z-index: 1;
		position: sticky;
		top: 0;

		border-radius: 6px 6px 0 0;
		height: 55px;

		background: linear-gradient(45deg, #fd6b9a, #f77f6e);
		background-size: 400% 400%;
		animation: ${Gradient} 3s ease infinite;
	}
	.heading1 {
		text-align: center;
		overflow: hidden;
		filter: drop-shadow(0px 5px 5px #282840);
		border-radius: 6px 6px 0 0;
		height: 55px;
		background: linear-gradient(45deg, #249ec7, #4cd0c5);
		background-size: 400% 400%;
		animation: ${Gradient} 3s ease infinite;
	}
	h1 {
		line-height: 55px;
		padding-left: 10px;
		color: #fff;
	}
	#rank {
		font-size: 1.2em;
		line-height: 55px;
		color: #fff;
		padding: 0 10px;
	}
	#rank > strong {
		color: #fff;
		font-size: 1.5em;
	}
	#Capa_1 {
		padding-top: 10px;
		width: 35px;
		height: 35px;
	}
	.box {
		position: relative;
		border-radius: 6px;
		text-align: center;
		height: 45px;
		filter: drop-shadow(2px 5px 5px #282840);
		width: 45px;
		background: #249ec7;
		transition: 0.5s;
		svg {
			path {
				fill: #fff;
			}
		}
	}

	.tooltiptext1 {
		visibility: hidden;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		line-height: 1.5;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		width: 120px;
		top: 130%;
		left: 50%;
		margin-left: -60px;
	}

	.box:hover {
		filter: drop-shadow(0px 0px 8px #1b1b2c);
		cursor: pointer;
		border-radius: 46px;
		border: 1px solid white;
		.tooltiptext1 {
			visibility: visible;
		}
	}
	.tooltiptext1::after {
		content: ' ';
		position: absolute;
		bottom: 100%; /* At the top of the tooltip */
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent black transparent;
	}
	.otherstat {
		line-height: 50px;

		padding-right: 20px;
		margin: 20px;
		margin-top: 10px;
	}

	.beauty {
		bottom: 85px;
		right: 0px;
		font-size: 100px;
		position: absolute;
		opacity: 0.02;
	}

	.navigation,
	.navigation1 {
		font-weight: 600;
		font-size: 13px;
		color: #6a93ff;
		transition: 0.5s;
	}
	.navigation1 {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	a {
		text-decoration: none;
	}
	.navigation:hover {
		color: #fff;
	}
	.center-align {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
		letter-spacing: 1.5px;
		margin-top: 115px;
	}

	.lead {
		font-weight: 400;
		color: #dfdfe7;
		font-size: 0.9em;
	}

	.follow {
		color: #fff;
		letter-spacing: 1px;
		text-align: left;
		font-size: 1em;
		font-weight: 600;
		margin-left: 10px;

		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 280px;
	}
	.personal-data {
		display: flex;
		flex-direction: column;

		& > div {
			display: flex;
			flex-direction: row;
		}
		margin-left: 20px;
	}

	${Content} {
		height: 80vh;
	}

	@media (max-width: 600px) {
		${Content} {
			height: 140vh;
		}
		min-height: 80%;
		.area {
			flex-direction: column;
			width: 100%;
			padding-right: 20px;
		}

		.container {
			width: 100%;
			min-height: 400px;
		}
		.stats {
			width: 100%;
			margin-bottom: 30px;
		}

		.beauty {
			z-index: -1;
		}
		.questions {
			padding-right: 0;
			height: auto;
		}
		.strength {
			margin-left: 10px;
			font-weight: 400;
			font-size: 0.7em;
		}
		.personal-data {
			flex-direction: row;
			margin: 0;
			justify-content: space-around;
			width: 100%;
		}
		${Button} {
			position: static;
		}
		.otherstat {
			padding-right: 10px;
		}
	}
`;

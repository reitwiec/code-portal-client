import { Button, Content, Navbar } from 'components';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

@inject('leaderboardStore', 'contestsStore', 'userStore')
@observer
class Leaderboard extends Component {
	componentDidMount() {
		this.props.leaderboardStore.fetchLeaderboard(this.props.slug);
	}

	render() {
		const {
			leaderboardStore: {
				leaderboard,
				currentPage,
				postsPerPage,
				setCurrentPage
			},
			userStore: {
				user: { name, username }
			},
			contestsStore: { title, slug }
		} = this.props;

		let myPosn;
		let mydets = {};
		for (myPosn = 0; myPosn < leaderboard.length; myPosn += 1) {
			if (leaderboard[myPosn].username === username) {
				mydets = leaderboard[myPosn];
				break;
			}
		}

		const indexOfLastPost = currentPage * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		const currentPosts = leaderboard.slice(indexOfFirstPost, indexOfLastPost);
		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(leaderboard.length / postsPerPage); i++) {
			pageNumbers.push(i);
		}
		const paginate = pageNumber => {
			setCurrentPage(pageNumber);
		};

		return (
			<div className={this.props.className}>
				<Navbar />
				<Content>
					<div>
						<NavLink to="/contests">
							<span className="navigation">All Contests</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<NavLink to={`/contest/${slug}`}>
							<span className="navigation">{title}</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<span className="navigation">Leaderboard</span>
					</div>

					<div className="area">
						<div className="container">
							<div className="heading">
								<h1>Leaderboard</h1>
								<span className="fadebg1">{title}</span>
							</div>
							<div className="content">
								{currentPosts.length === 0 ? (
									<div className="fallback">No submissions made yet</div>
								) : (
									<div>
										<div
											id="myrank"
											className={
												Object.entries(mydets).length === 0 &&
												mydets.constructor === Object
													? 'hideme'
													: 'questions'
											}>
											<span id="myname">
												<span id="srno">{myPosn + 1} .</span> {mydets.name}
											</span>
											<br id="onlymobile" />
											<span className="details">
												Your Score: {Math.ceil(mydets.points)}
											</span>
											<span className="strength">Your Rank: {mydets.rank}</span>
											<NavLink to={`/profile/${mydets.username}`}>
												<Button>{mydets.username}</Button>
											</NavLink>
										</div>

										{currentPosts.map((leader, i) => (
											<div className="questions" key={`leader_${i}`}>
												<section>
													<span id="srno">{i + indexOfFirstPost + 1} .</span>{' '}
													{leader.name}
												</section>
												<span className="details">
													Score: {Math.ceil(leader.points)}
												</span>
												<span className="strength">Rank: {leader.rank}</span>
												<NavLink to={`/profile/${leader.username}`}>
													<Button>{leader.username}</Button>
												</NavLink>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
						<ul className="paginate">
							{pageNumbers.map((number, i) => (
								<li
									id={number == currentPage ? 'selected' : 'unselect'}
									key={i}>
									<button onClick={() => paginate(number)} />
								</li>
							))}
						</ul>
						<ul className={currentPosts.length === 0 ? 'hideme' : 'paginate'}>
							<li id="selectedlist">
								<strong>
									{indexOfFirstPost + 1}-
									{indexOfLastPost - leaderboard.length > 0
										? leaderboard.length
										: indexOfLastPost}
								</strong>{' '}
								of {leaderboard.length}
							</li>
						</ul>
					</div>
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

export default styled(Leaderboard)`
	${Content} {
		min-height: 80vh;
	}
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
	.hideme {
		display: none;
	}
	.stats {
		width: 300px;
		height: 300px;
		border-radius: 6px;
		background: #2f2f4b; /* Old browsers */
		background: -moz-radial-gradient(
			center,
			ellipse cover,
			#2f2f4b 9%,
			#26263e 100%
		); /* FF3.6-15 */
		background: -webkit-radial-gradient(
			center,
			ellipse cover,
			#2f2f4b 9%,
			#26263e 100%
		); /* Chrome10-25,Safari5.1-6 */
		background: radial-gradient(
			ellipse at center,
			#2f2f4b 9%,
			#26263e 100%
		); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2f2f4b', endColorstr='#26263e',GradientType=1 );
		border: none;
		filter: drop-shadow(0 0 0.95rem #1f2032);
		animation: ${check1} 2s ease 1;
	}
	.details {
		font-weight: 400;
		font-size: 0.7em;
	}

	.area {
		margin-top: 30px;
		padding-right: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#selected button {
		background: #4bdc7c;
	}
	#selectedlist {
		color: white;
		margin-top: -20px;
		font-size: 0.8em;
	}
	#onlymobile {
		display: none;
	}
	.paginate {
		margin-top: 20px;
		list-style: none;
		text-decoration: none;
		li {
			float: left;
		}

		li button {
			width: 2px;
			margin: 10px;
			border-radius: 100px;
			display: block;
			border: none;
			background: white;
			text-align: center;
			padding: 4px;
			text-decoration: none;
			transition: 0.3s;
			:hover {
				cursor: pointer;
				padding: 5px;
			}
		}
		li {
			button,
			button:hover,
			button:active,
			button:active:focus,
			button:visited,
			button {
				outline: none;
			}
		}
	}

	${Button} {
		top: 20px;
		right: 10px;
		transition: 0.4s;
		position: absolute;
		background: #fd6b9a;
		width: auto;
		padding: 0 10px;
	}
	${Button}:hover {
		background: #f77f6e;
	}

	.strength {
		margin-left: 60px;
		font-weight: 400;
		font-size: 0.7em;
	}
	.questions {
		position: relative;
		color: #fff;
		font-size: 1.3em;
		font-weight: 700;
		line-height: 1;
		padding: 10px;
		margin: 20px 0 20px 0;
		background: #2b2e4e;
		transition: 0.2s;
	}
	.questions:hover {
		color: #fff;
		background: #363559;
	}
	#myrank {
		border-top: 2px solid #249ec7;
		border-bottom: 2px solid #249ec7;
		background: transparent;
		#myname {
			margin-right: 20px;
		}
		${Button} {
			top: 13px;
			background: #249ec7;
		}
	}
	#srno {
		font-size: 0.8em;
	}
	.container {
		border-radius: 6px;

		width: 60%;
		border: none;
		filter: drop-shadow(0px 15px 15px #181e30);
		background: #202942;
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
		padding-left: 10px;
		color: #fff;
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
		transition: 0.2s;
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
		flex-dirextion: row;
		flex-wrap: wrap;
		padding-right: 90px;
		margin: 20px;
		position: relative;
		display: flex;
		justify-content: space-between;
	}
	#lead {
		color: #d7d7ef;
		font-weight: 600;
		font-size: 1.2em;
		line-height: 2;
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
	.fallback {
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
		margin: 100px 0;
		letter-spacing: 1.5px;
	}
	@media (max-width: 600px) {
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

		.questions {
			padding-right: 0;
			height: auto;
		}
		.strength {
			margin-left: 10px;
			font-weight: 400;
			font-size: 0.7em;
		}
		.beauty {
			z-index: -1;
		}
		#onlymobile {
			display: block;
		}
	}
`;

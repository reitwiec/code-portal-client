import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar, Button, Content } from 'components';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('questionsStore', 'contestsStore')
@observer
class SubmissionsView extends Component {
	componentDidMount() {
		this.props.questionsStore.fetchSubmissions(this.props.slug);
	}

	render() {
		const {
			questionsStore: { submissions, id, score, slug, title }
		} = this.props;

		const contestSlug = this.props.contestsStore.slug;
		const contestTitle = this.props.contestsStore.title;
		return (
			<div className={this.props.className}>
				<Navbar />
				<Content>
					<div>
						<NavLink to="/contests">
							<span className="navigation">All Contests</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<NavLink to={`/contest/${contestSlug}`}>
							<span className="navigation">{contestTitle}</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<NavLink to={`/question/${slug}`}>
							<span className="navigation">{title}</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<NavLink to={`/submissions/${slug}`}>
							<span className="navigation">Submissions</span>
						</NavLink>
					</div>

					<div className="area">
						<div className="container">
							<div className="heading">
								<h1>{title}</h1>
								<span className="fadebg1">Submissions</span>
							</div>
							<div className="content">
								{submissions.map((submission, i) => (
									<div className="questions" key={`submission_${i}`}>
										<section>
											{new Date(submission.created_at).toString()}
										</section>
										<span className="details">Score: {submission.points}</span>
										<span className="strength">
											Verdict:{' '}
											{submission.verdict === 'CE'
												? 'COMPILE TIME ERROR'
												: submission.verdict}
										</span>
										<NavLink to={`/submission/${submission.id}`}>
											<Button>View</Button>
										</NavLink>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="beauty">
						<h1>Subm</h1>
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

export default styled(SubmissionsView)`
	${Content} {
		min-height: 77vh;
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
		padding-right: 100px;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	${Button} {
		top: 20px;
		right: 10px;
		transition: 0.4s;
		position: absolute;
		background: #fd6b9a;
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
		background: #fff;
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

		background: linear-gradient(45deg, #249ec7, #4cd0c5);
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
`;

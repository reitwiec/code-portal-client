import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { iecselogo } from 'assets';
import { NavLink } from 'react-router-dom';
import { Button } from 'components';
import { format } from 'util';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

@inject('authStore', 'userStore', 'forgotStore')
@observer
class ForgetPassword extends Component {
	render() {
		const {
			className,
			authStore: { isLoggedIn },
			forgotStore: {
				email,
				setEmail,
				meta,
				recover,
				captcha,
				onResolved,
				setCaptchaDOM
			},
			userStore: { user }
		} = this.props;
		if (!isLoggedIn || !user) {
			return (
				<div className={className}>
					<div className="container">
						<div className="hello" />
						<div className="hello1" />
						<div className="hello2" />
						<div className="hello3" />
						<div className="hello4" />
						<h2>
							<div className="login2">CodePortal</div>{' '}
							<div className="login1">Oops, forgot something?</div>
						</h2>
						<form onSubmit={recover}>
							<input
								type="text"
								placeholder="Email Address"
								className="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
							{meta.msg && (
								<div
									className={`meta ${
										meta.success ? 'meta-success' : 'meta-error'
									}`}>
									{' '}
									{meta.msg}{' '}
								</div>
							)}
							<ReCAPTCHA
								ref={el => setCaptchaDOM(el)}
								sitekey="6LdYa5oUAAAAAH9l_zSg-xctsR5DH5Z6ZMnRd0XU"
								render="explicit"
								theme="dark"
								className="recaptcha"
								onChange={onResolved}
							/>
							<Button onClick={recover}>
								<span>Recover Password</span>
							</Button>
						</form>
						<div className="beauty">
							<h1>Pass</h1>
						</div>
					</div>
				</div>
			);
		} else {
			if (user && (user.access === 20 || user.access === 30)) {
				return <Redirect to="/__admin" />;
			} else {
				return <Redirect to="/contests" />;
			}
		}
	}
}

const test = keyframes`
0%{ 
    opacity:0;
    }
100%{
    opacity:1;
    }
`;
const test1 = keyframes`
0%{
    width:40%;
    }
100%{

    width:80%;
    }
`;

const slide = keyframes`
	0% {
		transform: rotate(0) translateX(30px);
		opacity: 0;
	}

	100% {
		transform: rotate(0) translateX(0);
	}
`;

export default styled(ForgetPassword)`
	overflow: hidden;
	.container {
		animation: ${test} 0.8s 1 0s ease-in;
		overflow: hidden;
		position: absolute;
		top: 40%; /* position the top  edge of the element at the middle of the parent */
		left: 50%; /* position the left edge of the element at the middle of the parent */
		transform: translate(-50%, -50%);
		width: 400px;
		height: 350px;
		border-radius: 5px;
		filter: drop-shadow(0px 15px 15px #181e30);
		text-align: center;
		background: #202942; /* Old browsers */
	}
	.login1 {
		font-size: 0.4em;
		font-weight: 400;
		letter-spacing: 3px;
		color: #dfdfe7;
	}
	.login2 {
		font-size: 1.2em;
		margin-top: 10px;
		font-weight: 600;
		color: #dfdfe7;
	}

	.email,
	.password {
		display: block;
		animation: ${test1} 1.2s 1 0.2s ease-out forwards;
		font-weight: 500;
		color: #fff;
		border: 0px;
		border-radius: 4px;
		box-shadow: none;
		outline: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: 35px;
		margin-top: 20px;
		margin-left: 38px;
		border: none;
		text-indent: 10px;
		background: #272f49;
	}

	.recaptcha {
		margin-top: 20px;
		margin-left: 45px;
	}
	.password {
		margin-top: 10px;
	}

	input::-webkit-input-placeholder {
		color: #565f79;
	}

	button {
		color: #fff;
		font-weight: 400;
		float: none;
		background: #6f67fc;
		margin-top: 30px;
		width: 50%;
		height: 35px;
		padding: 10px;
		padding-top: 7px;
		border: none;
		border-radius: 20px;
		transition: 0.4s;
		filter: drop-shadow(0px 5px 3px #1d243a);
		:hover {
			width: 80%;
			background: #a94cf2;
			cursor: pointer;
		}
	}
	button > span {
		font-size: 1em;
		font-weight: 600;
	}
	.beauty {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		z-index: -1;
		color: white;
		bottom: -70px;
		left: -20px;
		font-size: 80px;
		position: absolute;
		opacity: 0.015;
	}

	.hello {
		z-index: 1;
		left: 0px;
		width: 20%;
		height: 3px;
		background: #fb0083;
		position: absolute;
	}
	.hello1 {
		z-index: 1;
		left: 20%;
		width: 20%;
		height: 3px;
		background: #4bdc7c;
		position: absolute;
		color: white;
	}
	.hello2 {
		z-index: 1;
		left: 40%;
		width: 20%;
		height: 3px;
		background: #b14aee;
		position: absolute;
		color: white;
	}
	.hello3 {
		z-index: 1;
		left: 60%;
		width: 20%;
		height: 3px;
		background: #f6c760;
		position: absolute;
		color: white;
	}
	.hello4 {
		z-index: 1;
		left: 80%;
		width: 20%;
		height: 3px;
		background: #6a93ff;
		position: absolute;
		color: white;
	}
	.meta {
		margin-top: 20px;
	}

	.meta-success {
		color: #4bdc7c;
	}

	.meta-error {
		color: #db3143;
	}

	@media (max-width: 600px) {
		.container {
			width: 340px;
		}
		input::-webkit-input-placeholder {
			font-size: 0.8em;
		}
		#rc-imageselect,
		.recaptcha {
			transform: scale(0.77);
			-webkit-transform: scale(0.77);
			transform-origin: 0 0;
			-webkit-transform-origin: 0 0;
			margin-left: 60px;
		}
		.field {
			font-size: 0.8em;
		}
	}
`;

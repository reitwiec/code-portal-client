import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { iecselogo } from 'assets';
import { NavLink } from 'react-router-dom';
import { Button } from 'components';
import { format } from 'util';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FormInput } from 'components';
import { Link } from 'react-router-dom';

@inject('resetStore', 'userStore', 'authStore')
@observer
class ResetPass extends Component {
	submit = e => {
		e.preventDefault();
		this.props.resetStore.onSubmit();
	};
	render() {
		const params = new URLSearchParams(this.props.location.search);
		const token = params.get('token');
		const {
			className,
			resetStore: { fields, meta, onFieldChange, onSubmit, resetToken },
			authStore: { isLoggedIn },
			userStore: { user }
		} = this.props;
		if (token === null) {
			if (user && (user.access === 20 || user.access === 30)) {
				return <Redirect to="/__admin" />;
			} else {
				return <Redirect to="/contests" />;
			}
		} else {
			this.props.resetStore.setToken(token);
			if (!isLoggedIn || !user) {
				return (
					<div className={className}>
						<span id="logo">
							<img src={iecselogo} alt="" id="logoimg" />
						</span>
						<div className="container">
							<div className="hello" />
							<div className="hello1" />
							<div className="hello2" />
							<div className="hello3" />
							<div className="hello4" />
							<h2>
								<div className="login2">CodePortal</div>{' '}
								<div className="login1">Reset password</div>
							</h2>
							<form onSubmit={this.submit}>
								<FormInput
									type="password"
									name="password"
									className="required"
									value={fields.password.value}
									error={fields.password.error}
									onChange={onFieldChange}
									placeholder="New Password"
								/>
								<FormInput
									type="password"
									name="password_confirmation"
									className="required"
									value={fields.password_confirmation.value}
									error={fields.password_confirmation.error}
									onChange={onFieldChange}
									placeholder="Confirm Password"
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
								<button
									disabled={!fields.password.value || !meta.isValid}
									value="Continue"
									type="submit"
									className={meta.msg ? 'afterReply' : ''}>
									<span>Reset Password</span>
								</button>
							</form>

							<div className="beauty">
								<h1>New</h1>
							</div>
						</div>
						<div className="alternative">
							<Link className="link" to={'/login'}>
								Sign In
							</Link>
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

const slide1 = keyframes`
	0% {
		transform: rotate(0) translateX(-300px);
		opacity: 0;
	}

	100% {
		transform: rotate(0) translateX(0);
	}
`;

export default styled(ResetPass)`
	#logo {
		position: absolute;
		top: -4px;
		left: 25px;
		transition: 1.2s;
		animation: ${slide} 1s 1 0s ease-in;

		img {
			width: 120px;
			height: 90px;
			transition: 1.2s;
		}

		:hover {
			cursor: pointer;
		}
	}

	#signin {
		color: #fb0083;
	}
	a {
		text-decoration: none;
	}
	min-height: 77vh;
	.alternative {
		top: 70%; /* position the top  edge of the element at the middle of the parent */
		left: 50%; /* position the left edge of the element at the middle of the parent */
		transform: translate(-50%, -50%);
		position: absolute;
		text-align: center;
	}

	.alternative > .link {
		margin: 20px;
		font-size: 0.9em;
		color: #6b94ff;
		transition: 0.3s;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		animation: ${slide1} 1s 1 0s ease-in;
		text-decoration: none;
		:hover {
			color: #fff;
			cursor: pointer;
			font-size: 1em;
		}
	}
	/* overflow: hidden; */
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

	input::-webkit-input-placeholder {
		color: #565f79;
	}

	button {
		font-size: 0.7em;
		font-family: 'Source Sans Pro', sans-serif;
		color: #fff;
		font-weight: 400;
		float: none;
		background: #6f67fc;
		margin-top: 80px;
		width: 50%;
		height: 35px;
		padding: 10px;
		padding-top: 7px;
		border: none;
		border-radius: 20px;
		transition: 0.4s;
		outline: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
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

	.afterReply {
		margin-top: 40px !important;
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

	.field-error-msg {
		position: absolute;
		left: 50%;
		bottom: -27px;
		font-size: 0.8em;
		width: 100%;
		transform: translateX(-50%);
		color: #db3143;
	}
	.required {
		position: relative;
	}

	.field {
		display: block;

		height: 35px;
		margin-top: 20px;
		margin-left: 38px;
		padding: 10px;
		outline: none;
		animation: ${test1} 1.2s 1 0.2s ease-out forwards;
		font-weight: 500;
		color: #fff;
		border: 0px;
		border-radius: 4px;
		box-shadow: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border: none;
		text-indent: 10px;
		background: #272f49;
	}

	.field:not(first-child) {
		margin-top: 40px;
	}

	input::-webkit-input-placeholder {
		color: #565f79;
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

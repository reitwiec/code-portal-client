import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button } from 'components';
import { FormInput } from 'components';

@inject('registerStore', 'authStore', 'userStore')
@observer
class Registerbox extends Component {
	submit = event => {
		event.preventDefault();
		this.props.registerStore.onSubmit();
	};

	render() {
		const {
			className,
			registerStore: {
				fields,
				meta,
				onFieldChange,
				onSubmit,
				captcha,
				onResolved,
				setCaptchaDOM
			},
			authStore: isLoggedIn,
			userStore: user
		} = this.props;

		if (!isLoggedIn || !user || true) {
			return (
				<div className={className}>
					<div className="container">
						<div className="hello" />
						<div className="hello1" />
						<div className="hello2" />
						<div className="hello3" />
						<div className="hello4" />
						<h2>
							{' '}
							<div className="login2">CodePortal</div>{' '}
							<div className="login1">Create a new account.</div>
						</h2>
						<form onSubmit={this.submit}>
							<FormInput
								type="text"
								name="name"
								className="required"
								value={fields.name.value}
								error={fields.name.error}
								onChange={onFieldChange}
								placeholder="Name"
							/>
							<FormInput
								type="text"
								name="username"
								className="required"
								value={fields.username.value}
								error={fields.username.error}
								onChange={onFieldChange}
								placeholder="Username"
							/>
							<FormInput
								type="email"
								name="email"
								className="required"
								value={fields.email.value}
								error={fields.email.error}
								onChange={onFieldChange}
								placeholder="Email"
							/>
							<FormInput
								type="password"
								name="password"
								className="required"
								value={fields.password.value}
								error={fields.password.error}
								onChange={onFieldChange}
								placeholder="Password"
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
							<FormInput
								type="text"
								name="organisation"
								className="required"
								value={fields.organisation.value}
								error={fields.organisation.error}
								onChange={onFieldChange}
								placeholder="Organisation"
							/>
							<FormInput
								type="text"
								name="regno"
								value={fields.regno.value}
								error={fields.regno.error}
								onChange={onFieldChange}
								placeholder="Registration number"
							/>
							<FormInput
								type="text"
								name="phone"
								value={fields.phone.value}
								error={fields.phone.error}
								onChange={onFieldChange}
								placeholder="Phone number"
							/>
							<ReCAPTCHA
								ref={el => setCaptchaDOM(el)}
								sitekey="6LdYa5oUAAAAAH9l_zSg-xctsR5DH5Z6ZMnRd0XU"
								render="explicit"
								theme="dark"
								className="recaptcha"
								onChange={onResolved}
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

							<button disabled={!meta.isValid} value="Continue" type="submit">
								<span>Register Account</span>
							</button>
						</form>
						<div className="beauty">
							<h1>Hello</h1>
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
	0% {
		opacity:0;
	}
	100% {
		opacity:1;
	}
`;

const test1 = keyframes`
	0% {
		width:40%;
	}
	100% {
		width:80%;
	}
`;

export default styled(Registerbox)`
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
	overflow: hidden;
	.container {
		animation: ${test} 0.8s 1 0s ease-in;
		overflow: hidden;
		position: relative;
		margin: 90px auto 30px;
		width: 400px;
		height: auto;
		padding-bottom: 30px;

		border-radius: 5px;
		filter: drop-shadow(0px 15px 15px #181e30);
		text-align: center;
		background: #202942;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	h2 {
		margin-top: 20px;
		font-weight: 100;
		letter-spacing: 3px;
		color: #dfdfe7;
	}

	h2 > span {
		font-weight: 400;
		letter-spacing: normal;
	}

	.field-error-msg {
		position: absolute;
		left: 50%;
		bottom: -17px;
		font-size: 0.8em;
		width: 100%;
		transform: translateX(-50%);
		color: #db3143;
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

	.field:not(:first-child) {
		margin-top: 10px;
	}

	.required {
		color: red;
		position: relative;

		&::before {
			content: '*';
			margin-top: 5px;
			color: #db3143;
			position: absolute;
			font-size: 1.8rem;
			top: 0px;
			animation: ${test} 2s 1 0s linear forwards;
			right: 60px;
		}
	}

	input::-webkit-input-placeholder {
		color: #565f79;
	}

	button {
		color: #fff;
		float: none;
		background: #90d074;
		margin-top: 20px;
		width: 50%;
		height: 35px;
		padding: 10px;
		padding-top: 7px;
		border: none;
		border-radius: 20px;
		transition: 0.4s;
		box-shadow: none;
		outline: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		filter: drop-shadow(0px 5px 3px #1d243a);
		:hover {
			width: 80%;
			background: #63c595;
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

	.meta {
		margin-top: 20px;
	}

	.meta-success {
		color: #4bdc7c;
	}

	.meta-error {
		color: #db3143;
	}

	.recaptcha {
		margin: 30px 50px;
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

		button > span {
			font-size: 0.9em;
			font-weight: 600;
		}
	}
`;

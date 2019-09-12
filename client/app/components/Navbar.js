import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import {
	Homeicon,
	Contesticon,
	Practiceicon,
	Notif,
	Searchbar
} from 'components';

import { iecselogo, avatar } from 'assets';

@inject('userStore')
@observer
class Navbar extends Component {
	render() {
		const {
			userStore: {
				user: { name, username }
			}
		} = this.props;
		return (
			<div className={`${this.props.className}`}>
				<div className=" navbar-flex">
					<div className="hello" />
					<div className="hello1" />
					<div className="hello2" />
					<div className="hello3" />
					<div className="hello4" />
					<NavLink to="/" className="left-align-flex">
						<span id="logo">
							<img src={iecselogo} alt="" id="logoimg" />
						</span>
					</NavLink>

					<NavLink to="/contests" className={`nav-item`}>
						<Contesticon />
					</NavLink>

					<NavLink to={`/profile/${username}`} className={`nav-item`}>
						<span id="avatar">
							<img src={avatar} alt="" id="avatarimg" />
						</span>
						<span id="unamenav">{name}</span>
						<Notif />
					</NavLink>
				</div>
			</div>
		);
	}
}

export default styled(Navbar)`
	z-index: 1000;
	position: sticky;
	top: 0;
	background: #202942;
	width: 100%;
	height: 50px;
	filter: drop-shadow(0px 5px 5px #181e30);

	.left-align-flex {
		margin-right: auto;
	}

	.navbar-flex {
		display: flex;
		justify-content: flex-end;
		width: 100%:
		align-items: center;
		height: 100%;
	}

	.nav-item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
	}
	a{
		text-decoration:none;
	}

	#logo {
		transition: 1.2s;

		img {
			width: 80px;
			height: 60px;
			transition: 1.2s;
			transform: translate(10px, -5px);
		}

		:hover {
			cursor: pointer;
		}
	}

	#avatar {
		display: none;
		position: absolute;
		top: 10px;
		right: 25px;
		transition: 0.5s;

		:hover {
			top: 12px;
			right: 27.5px;
		}

		img {
			border-radius: 50%;
			border: 1px solid #78a5fe;
			width: 30px;
			height: 30px;
			transition: 0.5s;

			:hover {
				opacity: 0.7;
				width: 28px;
				height: 28px;
				cursor: pointer;
			}
		}
	}

	#notif {
		display: none;
		position: absolute;
		top: 9px;
		right: 22px;
		float: right;
		height: 10px;
		width: 10px;
		stroke: #2f2e4b;
		stroke-width: 100px;
		transition: 0.5s;
	}

	#avatar:hover ~ #notif {
		top: 12px;
		right: 24px;
		height: 8px;
		width: 8px;
	}

	#unamenav {
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.7em;
		color: #78a5fe;
		font-weight: 600;
		transition: 0.5s;
		text-transform:capitalize;
	}

	#avatar:hover ~ #unamenav {
		right: 62px;
	}
	.hello {
		bottom:0;
		z-index: 1;
		left: 0px;
		width: 20%;
		height: 3px;
		background: #fb0083;
		position: absolute;
	}
	.hello1 {
		bottom:0;
		z-index: 1;
		left: 20%;
		width: 20%;
		height: 3px;
		background: #4bdc7c;
		position: absolute;
		color: white;
	}
	.hello2 {
		bottom:0;
		z-index: 1;
		left: 40%;
		width: 20%;
		height: 3px;
		background: #b14aee;
		position: absolute;
		color: white;
	}
	.hello3 {
		bottom:0;
		z-index: 1;
		left: 60%;
		width: 20%;
		height: 3px;
		background: #f6c760;
		position: absolute;
		color: white;
	}
	.hello4 {
		bottom:0;
		z-index: 1;
		left: 80%;
		width: 20%;
		height: 3px;
		background: #6a93ff;
		position: absolute;
		color: white;
	}
`;

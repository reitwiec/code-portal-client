import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

class Footer extends Component {
	render() {
		return (
			<footer className={this.props.className}>
				<br />
				<span id="copyright">
					<i className="fa fa-heart" id="heart" />
					&nbsp;© 2019, IECSE Manipal. All rights reserved.{' '}
				</span>
			</footer>
		);
	}
}
export default styled(Footer)`
	text-align: center;
	flex-shrink: 0;
	span {
		font-size: 0.8em;
		line-height: 40px;
	}
	#heart {
		color: #db3143 !important;
		font-size: 12px;
	}
	#copyright {
		color: #445076;
		font-weight: 400;
		font-size: 11px;
		letter-spacing: 0.4px;
	}
`;

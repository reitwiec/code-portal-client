import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/theme/duotone-dark.css';
import { inject } from 'mobx-react';
import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import styled from 'styled-components';



const languages = {
	cpp11: {
		id: 1,
		name: 'C++',
		mode: 'text/x-c++src',
		boilerplate: `#include <iostream>

using namespace std;

int main() {
	cout << "Hello, world!" << endl;
	return 0;
}`
	},
// 	cpp14: {
// 		id: 2,
// 		name: 'C++ 14',
// 		mode: 'text/x-c++src',
// 		boilerplate: `#include <iostream>

// using namespace std;

// int main() {
// 	cout << "Hello, world!" << endl;
// 	return 0;
// }`
// 	},
	java8: {
		id: 3,
		name: 'Java',
		mode: 'text/x-java',
		boilerplate: `import java.util.Scanner;
//Class name has to be Main.
public class Main {
	public static void main(String[] args) {
		System.out.println("Hello, world!");
	}
}`
	},
	python3: {
		id: 4,
		name: 'Python 3',
		mode: 'text/x-python',
		boilerplate: ``
	},
	python2: {
		id: 5,
		name: 'Python 2',
		mode: 'text/x-python',
		boilerplate: ``
	}
};
@inject('questionsStore')
class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			language: 'cpp11'
		};
	}

	onLanguageChange = e => {
		this.setState({ language: e.target.value });
		this.props.questionsStore.updateLanguage(languages[e.target.value].id);
		this.props.questionsStore.updateCode(
			null,
			null,
			languages[e.target.value].boilerplate
		);
	};

	componentDidMount() {
		this.props.questionsStore.updateCode(
			null,
			null,
			languages[this.state.language].boilerplate
		);
	}

	render() {
		const {
			questionsStore: { updateCode }
		} = this.props;
		return (
			<div className={this.props.className}>
				<div>
					<select value={this.state.value} onChange={this.onLanguageChange}>
						{Object.keys(languages).map((lang, i) => (
							<option key={i} value={lang}>
								{languages[lang].name}
							</option>
						))}
					</select>
				</div>
				<CodeMirror
					value={languages[this.state.language].boilerplate}
					onChange={updateCode}
					options={{
						theme: 'duotone-dark',
						lineNumbers: true,
						mode: languages[this.state.language].mode
					}}
				/>
			</div>
		);
	}
}

export default styled(Editor)`
	border: 1px solid #1e202f;

	> div:first-child {
		display: flex;
		// position:absolute;
		border-left: 6px solid #fb0083;
		padding: 0.4em;
		padding-bottom: 10px;
		background-color: #242942;
	}

	> div:first-child > select {
		color: #535b87;
		width: 20ch;
		font-weight: 500;
		font-size: 0.8em;
		padding: 0.2em 0.4em;
		border: 1px solid #535b87;
		border-radius: 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		outline: none;

		background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#e0873f'><polygon points='0,0 100,0 50,50'/></svg>")
			no-repeat;
		background-size: 0.8em;
		background-position: calc(100% - 1ch) center;
		background-repeat: no-repeat;
		background-color: #242942;
	}
	.CodeMirror {
		font-family: 'Inconsolata', monospace;
		font-size: 1.2em;
		height: 600px;
		/* color: #eeffff; */
	}
	.cm-s-duotone-dark.CodeMirror {
		background: #2a304b;
		color: #c5cbdd;
	}
	.cm-s-duotone-dark .CodeMirror-gutters {
		background: #2a304b;
		color: #c5cbdd;
	}
	.cm-s-duotone-dark .CodeMirror-cursor {
		font-size: 1px;
		border-left: 1px solid #ffcc00;
		border-right: 1px solid #ffcc00;
		opacity: 1;
	}
	.cm-s-duotone-dark .CodeMirror-linenumber {
		color: #535b87;
	}
	.cm-s-duotone-dark .cm-type {
		color: #ce5264;
	}

	.cm-s-duotone-dark .cm-keyword {
		color: #89ddfd;
	}
	.cm-s-duotone-dark .cm-string {
		color: #c3e88d;
	}
	.cm-s-duotone-dark .cm-variable {
		color: #eeffff;
	}
	.cm-s-duotone-dark .cm-number {
		color: #ee886a;
	}
	.cm-s-duotone-dark .cm-meta {
		color: #eeffff;
	}
	.cm-s-duotone-dark .cm-operator {
		color: #c792ea;
	}
`;

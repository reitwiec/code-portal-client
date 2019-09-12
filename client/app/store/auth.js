import { observable, action } from 'mobx';
import { userStore } from 'store';
import Validator from 'validatorjs';

class AuthStore {
	@observable email = '';
	@observable password = '';
	@observable isLoggedIn = false;
	@observable inProgress = false;

	@observable
	captcha = null;

	captchaDOM = null;

	@observable
	meta = {
		success: false,
		msg: null
	};

	@action setEmail = value => {
		this.email = value;
	};

	@action
	onResolved = key => (this.captcha = key);

	@action
	setCaptchaDOM = captcha => (this.captchaDOM = captcha);

	@action setPassword = value => {
		this.password = value;
	};

	logout = e => {
		fetch('/api/logout', {
			credentials: 'same-origin'
		})
			.then(res => res.json())
			.then(({ success }) => {
				if (success) {
					this._setLoginState(false);
					userStore.setUser(null);
				} else this.meta.msg = msg;
			});
	};

	login = e => {
		console.log('hello');
		e.preventDefault();
		const validation = new Validator({ email: this.email }, { email: 'email' });
		const isValidEmail = validation.passes();
		if (this.email === '') {
			this.meta.msg = 'Email ID is required';
			return;
		} else if (this.password === '') {
			this.meta.msg = 'Password is required';
			return;
		} else if (!isValidEmail) {
			this.meta.msg = 'Invalid email';
			return;
		}
		fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: this.email, password: this.password }),
			credentials: 'same-origin'
		})
			.then(res => res.json())
			.then(({ success, user, msg }) => {
				this._setLoginState(success);
				if (success) {
					userStore.setUser(user);
					this.email = '';
					this.password = '';
				} else this.meta.msg = msg;
			});
	};

	recover = e => {
		e.preventDefault();
		const validation = new Validator({ email: this.email }, { email: 'email' });
		const isValidEmail = validation.passes();
		if (this.email === '') {
			this.meta.msg = 'Email is required';
			return;
		} else if (!isValidEmail) {
			this.meta.msg = 'Invalid email';
			return;
		}

		if (!this.captcha) {
			this.meta.success = false;
			this.meta.msg = 'Please fill the captcha';
			return;
		}
		this.captchaDOM.reset();

		console.log(this.captcha);
		let postData = { email: this.email, 'g-recaptcha-response': this.captcha };

		fetch('/api/forgotpass', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData),
			credentials: 'same-origin'
		})
			.then(res => res.json())
			.then(({ success, msg }) => {
				if (success) {
					this.meta.success = success;
					this.email = '';
					this.meta.msg = msg;
					return;
				} else this.meta.msg = msg;
			});
	};

	@action _setLoginState = value => {
		this.isLoggedIn = value;
	};
}

export default new AuthStore();

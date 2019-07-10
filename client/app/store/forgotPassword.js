import { observable, action } from 'mobx';
import { userStore } from 'store';
import Validator from 'validatorjs';

class ForgotStore {
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

	recover = e => {
		e.preventDefault();
		const validation = new Validator({ email: this.email }, { email: 'email' });
		const isValidEmail = validation.passes();
		if (this.email === '') {
			this.meta.msg = 'Email is required';
			this.captchaDOM.reset();
			return;
		}
		if (!isValidEmail) {
			this.meta.msg = 'Invalid email';
			this.captchaDOM.reset();
			return;
		}

		if (!this.captcha) {
			this.meta.success = false;
			this.meta.msg = 'Please fill the captcha';
			this.captchaDOM.reset();
			return;
		}

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
				} else {
					this.email = '';
					this.meta.msg = msg;
					return;
				}
			});
	};
}

export default new ForgotStore();

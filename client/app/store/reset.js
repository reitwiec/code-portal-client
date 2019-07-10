import { observable, action } from 'mobx';
import Validator from 'validatorjs';

class ResetStore {
	@observable
	fields = {
		password: {
			value: '',
			error: null,
			rule: 'required|confirmed|min:8|max:30'
		},
		password_confirmation: {
			value: '',
			error: null,
			rule: 'required|min:8|max:30'
		}
	};

	@observable
	meta = {
		isValid: true,
		msg: null,
		success: null
	};
	@observable
	resetToken = '';

	@action
	setToken = value => {
		this.resetToken = value;
	};

	@action
	onFieldChange = (field, value) => {
		this.fields[field].value = value;
		var validation = new Validator(
			Object.keys(this.fields).reduce(
				(a, c) => ({ ...a, [c]: this.fields[c].value }),
				{}
			),
			Object.keys(this.fields).reduce(
				(a, c) => ({ ...a, [c]: this.fields[c].rule }),
				{}
			)
		);
		this.meta.isValid = validation.passes();

		if (field === 'password' || field === 'password_confirmation') {
			this.fields.password.error =
				validation.errors.first('password') === false
					? null
					: validation.errors.first('password');
			this.fields.password_confirmation.error =
				validation.errors.first('password_confirmation') === false
					? null
					: validation.errors.first('password_confirmation');
		} else {
			this.fields[field].error =
				validation.errors.first(field) === false
					? null
					: validation.errors.first(field);
		}
	};
	@action
	onSubmit = () => {
		let postData = {
			token: this.resetToken,
			newpass: this.fields.password.value
		};
		console.log(postData);
		fetch('/api/resetpass', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData),
			credentials: 'same-origin'
		})
			.then(res => res.json())
			.then(({ success, msg }) => {
				this.meta.success = success;
				this.meta.msg = msg;
				if (success)
					Object.keys(this.fields).forEach(
						key => (this.fields[key].value = '')
					);
			});
	};
}
export default new ResetStore();

import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        // здесь обрабатываем вход в систему
    }
    render() {
        return (
            <section className="login">
                <form onSubmit={this.handleSubmit} className="form">
                    <h1 className="form__title">Вход</h1>
                    <input
                        id="email"
                        className="form__input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input
                        id="password"
                        className="form__input"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button
                        type="submit"
                        onSubmit={this.handleSubmit}
                        className="form__submit"
                    >
                        Войти
                    </button>
                </form>
            </section>
        );
    }
}

export default withRouter(Login);

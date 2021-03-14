import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            calGoal: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        // здесь обработчик регистрации
    };
    render() {
        return (
            <div className="register">
                <form onSubmit={this.handleSubmit} className="form">
                    <h1 className="form__title">Регистрация</h1>
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
                        Зарегистрироваться
                    </button>
                </form>
                <div className="register__signin">
                    <p>Уже зарегистрированы? &nbsp;
                        <Link to="/sign-in" className="register__login-link">
                            Войти
                        </Link>
                    </p>
                    
                </div>
            </div>
        );
    }
}

export default Register;

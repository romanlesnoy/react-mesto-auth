import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({onRegister}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onRegister(email, password);
    }
    
    return (
        <section className="register">
            <form onSubmit={handleSubmit} className="form">
                <h1 className="form__title">Регистрация</h1>
                <input
                    id="email"
                    className="form__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                <input
                    id="password"
                    className="form__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="form__submit"
                >
                    Зарегистрироваться
                </button>
            </form>
            <div className="register__signin">
                <p>
                    Уже зарегистрированы? &nbsp;
                    <Link to="/sign-in" className="register__login-link">
                        Войти
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;

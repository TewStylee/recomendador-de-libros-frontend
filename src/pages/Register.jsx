import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const fullName = `${formData.name} ${formData.lastname}`;
            await authAPI.register(formData.email, formData.password, fullName);
            alert('✓ Cuenta creada exitosamente');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'No se pudo crear la cuenta');
        }
    };

    return (
        <div className="container">
            <div className="auth-card">
                <h1>📚 Book Recommender</h1>
                <p className="subtitle">Descubre tu próxima lectura favorita</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            required
                            placeholder="Juan"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname">Apellido</label>
                        <input
                            type="text"
                            id="lastname"
                            required
                            placeholder="Pérez"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Crear Cuenta
                    </button>
                </form>

                <p className="footer-text">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

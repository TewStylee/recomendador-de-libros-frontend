import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h2>📚 Book Recommender</h2>
            <div className="navbar-links">
                <Link to="/recommendations" className="btn-secondary">Recomendaciones</Link>
                <Link to="/my-interests" className="btn-secondary">Mis Intereses</Link>
                <Link to="/my-books" className="btn-secondary">Mis Libros</Link>
                <button onClick={handleLogout} className="btn-secondary">Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;

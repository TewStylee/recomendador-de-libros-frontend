import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { libraryAPI } from '../services/api';

const MyInterests = () => {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadInterests();
    }, []);

    const loadInterests = async () => {
        try {
            const data = await libraryAPI.getAll('INTERESTED');
            setInterests(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar');
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (interactionId) => {
        try {
            await libraryAPI.update(interactionId, 'READ');
            loadInterests(); // Reload list
        } catch (err) {
            alert('Error al actualizar');
        }
    };

    const handleRemove = async (interactionId) => {
        try {
            await libraryAPI.remove(interactionId);
            loadInterests(); // Reload list
        } catch (err) {
            alert('Error al eliminar');
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container">
                    <div className="loading">Cargando...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="container">
                    <div className="error-message">{error}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Mis Intereses</h1>
                <p className="subtitle" style={{ color: '#e0e0e0', textAlign: 'center' }}>
                    Libros que te interesan
                </p>

                <div className="books-grid">
                    {interests.map((interaction) => (
                        <BookCard
                            key={interaction.id}
                            book={interaction.book}
                            onMarkAsRead={() => handleMarkAsRead(interaction.id)}
                            onRemove={() => handleRemove(interaction.id)}
                        />
                    ))}
                </div>

                {interests.length === 0 && (
                    <div className="empty-state">
                        No tienes libros marcados como interesantes aún.
                    </div>
                )}
            </div>
        </>
    );
};

export default MyInterests;

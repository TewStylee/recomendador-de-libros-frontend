import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { libraryAPI } from '../services/api';

const MyBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await libraryAPI.getAll('READ');
            setBooks(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar');
            setLoading(false);
        }
    };

    const handleRemove = async (interactionId) => {
        try {
            await libraryAPI.remove(interactionId);
            loadBooks(); // Reload list
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
                <h1 style={{ color: 'white', textAlign: 'center' }}>Mis Libros Leídos</h1>
                <p className="subtitle" style={{ color: '#e0e0e0', textAlign: 'center' }}>
                    Libros que ya has leído
                </p>

                <div className="books-grid">
                    {books.map((interaction) => (
                        <BookCard
                            key={interaction.id}
                            book={interaction.book}
                            onRemove={() => handleRemove(interaction.id)}
                        />
                    ))}
                </div>

                {books.length === 0 && (
                    <div className="empty-state">
                        No tienes libros marcados como leídos aún.
                    </div>
                )}
            </div>
        </>
    );
};

export default MyBooks;

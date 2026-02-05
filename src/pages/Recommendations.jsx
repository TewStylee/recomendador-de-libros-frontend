import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import { recommendationsAPI, libraryAPI, booksAPI } from '../services/api';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadRecommendations();
    }, []);

    const loadRecommendations = async () => {
        try {
            const data = await recommendationsAPI.get(12);
            setRecommendations(data.recommendations || []);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar recomendaciones');
            setLoading(false);
        }
    };

    const handleAddToLibrary = async (googleBookId, status) => {
        try {
            await libraryAPI.add(googleBookId, status);
            alert(`✓ Libro agregado como "${status}"`);
        } catch (err) {
            alert('Error al agregar libro');
        }
    };

    const handleImageClick = async (book) => {
        try {
            const details = await booksAPI.getDetails(book.id);
            setSelectedBook(details);
            setIsModalOpen(true);
        } catch (err) {
            // If API fails, show basic info from recommendation
            setSelectedBook(book);
            setIsModalOpen(true);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container">
                    <div className="loading">Cargando recomendaciones...</div>
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
                <h1 style={{ color: 'white', textAlign: 'center' }}>Tus Recomendaciones</h1>
                <p className="subtitle" style={{ color: '#e0e0e0', textAlign: 'center' }}>
                    Libros seleccionados especialmente para ti
                </p>

                <div className="books-grid">
                    {recommendations.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onInterested={() => handleAddToLibrary(book.id, 'INTERESTED')}
                            onRead={() => handleAddToLibrary(book.id, 'READ')}
                            onImageClick={handleImageClick}
                        />
                    ))}
                </div>

                {recommendations.length === 0 && (
                    <div className="empty-state">
                        No hay recomendaciones disponibles. Verifica tus preferencias.
                    </div>
                )}
            </div>

            <BookModal
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Recommendations;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../services/api';
import GenreCard from '../components/GenreCard';

const GENRES = [
    'Ficción', 'Misterio', 'Ciencia Ficción', 'Fantasía', 'Romance',
    'Thriller', 'Biografía', 'Historia', 'Autoayuda', 'Negocios',
    'Poesía', 'Terror', 'Aventura', 'Filosofía', 'Ciencia'
];

const Preferences = () => {
    const [selectedGenres, setSelectedGenres] = useState(new Set());
    const [authors, setAuthors] = useState('');
    const [books, setBooks] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleGenre = (genre) => {
        const newSet = new Set(selectedGenres);
        if (newSet.has(genre)) {
            newSet.delete(genre);
        } else {
            newSet.add(genre);
        }
        setSelectedGenres(newSet);
    };

    const handleSubmit = async () => {
        if (selectedGenres.size === 0) {
            setError('Por favor selecciona al menos un género');
            return;
        }

        try {
            const favorite_authors = authors
                ? authors.split(',').map(a => a.trim()).filter(a => a)
                : [];

            const favorite_books = books
                ? books.split(',').map(b => b.trim()).filter(b => b)
                : [];

            await usersAPI.updatePreferences(
                Array.from(selectedGenres),
                favorite_authors,
                favorite_books
            );

            navigate('/recommendations');
        } catch (err) {
            setError('Error al guardar preferencias');
        }
    };

    return (
        <div className="container">
            <div className="preferences-card">
                <h1>¿Qué te gusta leer?</h1>
                <p className="subtitle">Selecciona tus géneros favoritos</p>

                {error && <div className="error-message">{error}</div>}

                <div className="genres-grid">
                    {GENRES.map(genre => (
                        <GenreCard
                            key={genre}
                            genre={genre}
                            isSelected={selectedGenres.has(genre)}
                            onClick={() => toggleGenre(genre)}
                        />
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="authors">Autores favoritos (opcional)</label>
                    <input
                        type="text"
                        id="authors"
                        placeholder="Ej: Gabriel García Márquez, J.K. Rowling"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                    />
                    <small>Separa los autores con comas</small>
                </div>

                <div className="form-group">
                    <label htmlFor="books">Libros favoritos (opcional)</label>
                    <input
                        type="text"
                        id="books"
                        placeholder="Ej: Cien años de soledad, Harry Potter"
                        value={books}
                        onChange={(e) => setBooks(e.target.value)}
                    />
                    <small>Separa los libros con comas</small>
                </div>

                <button onClick={handleSubmit} className="btn-primary">
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default Preferences;

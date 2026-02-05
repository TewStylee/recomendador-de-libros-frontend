const BookModal = ({ book, isOpen, onClose }) => {
    if (!book) return null;

    const cover = book.cover_url ||
        book.volumeInfo?.imageLinks?.thumbnail ||
        'https://via.placeholder.com/200x300?text=No+Cover';
    const title = book.title || book.volumeInfo?.title || 'Sin título';
    const author = book.author || book.volumeInfo?.authors?.join(', ') || 'Autor desconocido';
    const googleId = book.google_id || book.id || 'N/A';

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`modal ${isOpen ? 'active' : ''}`} onClick={handleBackdropClick}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-book">
                    <img src={cover} alt={title} />
                    <div>
                        <h2>{title}</h2>
                        <p className="author">{author}</p>
                        <p>ID de Google Books: {googleId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookModal;

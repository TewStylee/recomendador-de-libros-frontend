const BookCard = ({ book, onInterested, onRead, onRemove, onMarkAsRead, onImageClick, showActions = true }) => {
    const cover = book.volumeInfo?.imageLinks?.thumbnail ||
        book.volumeInfo?.imageLinks?.smallThumbnail ||
        book.cover_url ||
        'https://via.placeholder.com/128x192?text=No+Cover';

    const title = book.volumeInfo?.title || book.title || 'Sin título';
    const authors = book.volumeInfo?.authors?.join(', ') || book.author || 'Autor desconocido';
    const reason = book.recommendationReason || '';
    const buyLink = book.volumeInfo?.infoLink || `https://www.amazon.com/s?k=${encodeURIComponent(title)}`;

    const truncatedTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;

    return (
        <div className="book-card">
            <img

                src={cover}
                alt={title}
                onClick={() => onImageClick && onImageClick(book)}
            />
            
            <div className="book-info">
                <h3>{truncatedTitle}</h3>
                <p className="author">{authors}</p>
                {reason && <p className="reason">{reason}</p>}

                {showActions && (
                    <>
                        <div className="book-actions">
                            {onInterested && (
                                <button onClick={onInterested} className="btn-small btn-interested">
                                    Me interesa
                                </button>
                            )}
                            {onRead && (
                                <button onClick={onRead} className="btn-small btn-read">
                                    Leído
                                </button>
                            )}
                            {onMarkAsRead && (
                                <button onClick={onMarkAsRead} className="btn-small btn-read">
                                    Marcar como Leído
                                </button>
                            )}
                            {onRemove && (
                                <button onClick={onRemove} className="btn-small btn-delete">
                                    Eliminar
                                </button>
                            )}
                        </div>
                        {onInterested && (
                            <a href={buyLink} target="_blank" rel="noopener noreferrer" className="btn-buy">
                                🛒 Comprar
                            </a>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookCard;

const GenreCard = ({ genre, isSelected, onClick }) => {
    return (
        <div
            className={`genre-card ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {genre}
        </div>
    );
};

export default GenreCard;

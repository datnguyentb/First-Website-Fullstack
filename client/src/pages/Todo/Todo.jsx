import PropTypes from 'prop-types';

function Todo() {
    return <h2>Todo Page</h2>;
}

Todo.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default Todo;

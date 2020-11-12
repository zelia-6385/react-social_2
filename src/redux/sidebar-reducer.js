let initialState = {
    friends: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Sasha' },
        { id: 3, name: 'Victor' },
        { id: 4, name: 'Andrey' },
        { id: 5, name: 'Sveta' },
    ],
};

const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;

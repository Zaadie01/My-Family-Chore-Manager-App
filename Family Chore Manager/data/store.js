// Simple in-memory storage
export const store = {
    chores: [],
    userPoints: {}
};

// Store operations
export const getChores = () => store.chores;

export const addChore = (chore) => {
    store.chores.push(chore);
    return chore;
};

export const findChoreById = (id) => {
    return store.chores.find(c => c.id === id);
};

export const deleteChore = (id) => {
    const index = store.chores.findIndex(c => c.id === id);
    if (index !== -1) {
        store.chores.splice(index, 1);
        return true;
    }
    return false;
};

export const getUserPoints = (userId) => {
    return store.userPoints[userId] || 0;
};

export const addUserPoints = (userId, points) => {
    if (!store.userPoints[userId]) {
        store.userPoints[userId] = 0;
    }
    store.userPoints[userId] += points;
    return store.userPoints[userId];
};

export const getAllUserPoints = () => {
    return Object.entries(store.userPoints)
        .map(([userId, points]) => ({ userId, points }))
        .sort((a, b) => b.points - a.points);
}; 
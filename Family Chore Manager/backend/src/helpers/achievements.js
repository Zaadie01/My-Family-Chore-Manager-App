export const calculateAchievements = (points) => {
    const achievements = [];
    
    if (points >= 1000) {
        achievements.push({ 
            name: 'Master Organizer', 
            description: 'Earned 1000 points' 
        });
    }
    if (points >= 500) {
        achievements.push({ 
            name: 'Super Helper', 
            description: 'Earned 500 points' 
        });
    }
    if (points >= 100) {
        achievements.push({ 
            name: 'Getting Started', 
            description: 'Earned 100 points' 
        });
    }
    
    return achievements;
}; 
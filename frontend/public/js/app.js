// API base URL
const API_URL = 'http://localhost:3001/api';

// Load everything when the page loads
window.onload = function() {
    // Get the form and add submit event
    const form = document.getElementById('addChoreForm');
    form.onsubmit = addChore;

    // Load initial data
    loadChores();
    updatePointsAndLeaderboard();
};

// Add a new chore
async function addChore(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('choreName').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const dueDate = document.getElementById('dueDate').value;
    const reward = document.getElementById('reward').value || 10;

    // Send to server
    try {
        const response = await fetch(`${API_URL}/chores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, assignedTo, dueDate, reward })
        });

        if (response.ok) {
            // Clear form
            document.getElementById('addChoreForm').reset();
            document.getElementById('reward').value = '10';
            
            // Refresh data
            loadChores();
            updatePointsAndLeaderboard();
        } else {
            alert('Error adding chore');
        }
    } catch (error) {
        alert('Error adding chore');
    }
}

// Load all chores
async function loadChores() {
    try {
        const response = await fetch(`${API_URL}/chores`);
        const chores = await response.json();
        
        // Get the chores container
        const choresList = document.getElementById('choresList');
        choresList.innerHTML = '';

        // Add each chore to the page
        chores.forEach(chore => {
            const choreDiv = document.createElement('div');
            choreDiv.className = 'chore-card';
            if (chore.completed) {
                choreDiv.className += ' completed';
            }

            choreDiv.innerHTML = `
                <h3>${chore.name}</h3>
                <p>Assigned to: ${chore.assignedTo}</p>
                <p>Due Date: ${new Date(chore.dueDate).toLocaleDateString()}</p>
                <p>Points: ${chore.reward}</p>
                <p>Status: ${chore.completed ? 'Done' : 'Not Done'}</p>
                <div class="actions">
                    ${!chore.completed ? 
                        `<button onclick="completeChore('${chore.id}')">Complete</button>` : 
                        ''
                    }
                    <button onclick="deleteChore('${chore.id}')">Delete</button>
                </div>
            `;

            choresList.appendChild(choreDiv);
        });
    } catch (error) {
        alert('Error loading chores');
    }
}

// Complete a chore
async function completeChore(id) {
    try {
        const response = await fetch(`${API_URL}/chores/${id}/complete`, {
            method: 'PUT'
        });

        if (response.ok) {
            loadChores();
            updatePointsAndLeaderboard();
        } else {
            alert('Error completing chore');
        }
    } catch (error) {
        alert('Error completing chore');
    }
}

// Delete a chore
async function deleteChore(id) {
    if (confirm('Are you sure you want to delete this chore?')) {
        try {
            const response = await fetch(`${API_URL}/chores/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadChores();
            } else {
                alert('Error deleting chore');
            }
        } catch (error) {
            alert('Error deleting chore');
        }
    }
}

// Update points and leaderboard
async function updatePointsAndLeaderboard() {
    try {
        // Get current user
        const userId = document.getElementById('assignedTo').value;
        if (userId) {
            // Get user's points
            const pointsResponse = await fetch(`${API_URL}/points/${userId}`);
            const pointsData = await pointsResponse.json();
            
            // Update points display
            const pointsDiv = document.getElementById('userPoints');
            pointsDiv.innerHTML = `
                <h3>${userId}'s Points</h3>
                <div class="points-badge">${pointsData.points} Points</div>
            `;

            // Update achievements
            const achievementsDiv = document.getElementById('achievements');
            achievementsDiv.innerHTML = '<h3>Achievements</h3>';
            
            if (pointsData.achievements.length > 0) {
                pointsData.achievements.forEach(achievement => {
                    achievementsDiv.innerHTML += `
                        <div class="achievement-card">
                            <h3>${achievement.name}</h3>
                            <p>${achievement.description}</p>
                        </div>
                    `;
                });
            } else {
                achievementsDiv.innerHTML += '<p>Complete more chores to earn achievements!</p>';
            }
        }

        // Update leaderboard
        const leaderboardResponse = await fetch(`${API_URL}/points`);
        const leaderboard = await leaderboardResponse.json();
        
        const leaderboardDiv = document.getElementById('leaderboard');
        leaderboardDiv.innerHTML = '<h3>Leaderboard</h3>';
        
        if (leaderboard.length > 0) {
            leaderboard.forEach((entry, index) => {
                leaderboardDiv.innerHTML += `
                    <div class="leaderboard-item">
                        <span>#${index + 1} ${entry.userId}</span>
                        <span>${entry.points} Points</span>
                    </div>
                `;
            });
        } else {
            leaderboardDiv.innerHTML += '<p>No points earned yet!</p>';
        }
    } catch (error) {
        alert('Error updating points and leaderboard');
    }
} 
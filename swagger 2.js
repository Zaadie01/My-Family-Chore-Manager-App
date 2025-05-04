export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Family Chore Manager API',
        version: '1.0.0',
        description: 'API for managing family chores and rewards'
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Development server'
        }
    ],
    paths: {
        '/api/chores': {
            get: {
                summary: 'Get all chores',
                responses: {
                    '200': {
                        description: 'List of all chores'
                    }
                }
            },
            post: {
                summary: 'Create a new chore',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'assignedTo', 'dueDate'],
                                properties: {
                                    name: { type: 'string' },
                                    assignedTo: { type: 'string' },
                                    dueDate: { type: 'string', format: 'date' },
                                    reward: { type: 'number', default: 10 }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Chore created successfully'
                    }
                }
            }
        },
        '/api/chores/{id}/complete': {
            put: {
                summary: 'Mark a chore as complete',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Chore marked as complete'
                    }
                }
            }
        },
        '/api/chores/{id}': {
            delete: {
                summary: 'Delete a chore',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Chore deleted successfully'
                    }
                }
            }
        },
        '/api/points/{userId}': {
            get: {
                summary: 'Get user points and achievements',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'User points and achievements'
                    }
                }
            }
        },
        '/api/points': {
            get: {
                summary: 'Get leaderboard',
                responses: {
                    '200': {
                        description: 'Leaderboard of all users and their points'
                    }
                }
            }
        }
    }
}; 
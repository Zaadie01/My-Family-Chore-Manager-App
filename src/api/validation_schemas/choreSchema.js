export const createChoreSchema = {
  name: {
    type: 'string',
    required: true,
    minLength: 1
  },
  description: {
    type: 'string',
    required: false
  },
  assigned_to: {
    type: 'string',
    required: false
  },
  reward: {
    type: 'number',
    required: false,
    min: 0
  }
};

export const updateChoreSchema = {
  name: {
    type: 'string',
    required: false,
    minLength: 1
  },
  description: {
    type: 'string',
    required: false
  },
  assigned_to: {
    type: 'string',
    required: false
  },
  completed_by: {
    type: 'string',
    required: false
  },
  completed_at: {
    type: 'string',
    required: false
  },
  reward: {
    type: 'number',
    required: false,
    min: 0
  }
}; 
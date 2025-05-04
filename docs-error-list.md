Error list

Type        Code                    Message                                     Parameters
------------------------------------------------------------------------------------------------
Error       invalidChoreObject      Invalid chore object structure.             {"invalidFields": {}, "expectedType": {}}
Error       missingRequiredFields   Required fields are missing.                {"missingFields": ["name", "assignedTo", "dueDate"]}
Error       invalidFieldType        Field has invalid type.                     {"field": "string", "expectedType": "string", "receivedType": "string"}
Error       invalidDateFormat       Due date format is invalid.                 {"dueDate": "string", "format": "YYYY-MM-DD"}
Error       invalidRewardPoints     Reward points must be a positive number.    {"reward": "number", "min": 0}
Error       choreNotFound           Chore with specified ID not found.          {"choreId": "string"}
Error       storageError            Failed to store chore in database.          {"error": "string"}
Warning     defaultValueApplied     Default value applied to optional field.    {"field": "string", "value": "any"}
Warning     emptyChoresList         No chores found in the system.             {"filter": "object"}
Warning     noChores                No chores found in the system.             {}
Warning     noPoints                No points recorded for the user.           {"userId": "string"}
Warning     noLeaderboard           No users have earned points yet.           {} 
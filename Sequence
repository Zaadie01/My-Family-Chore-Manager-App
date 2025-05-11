1. Sequence: Validation of Chore Object
   
   1.1. Calls the validate method for chore object by checking required fields and fills validationResult.
        - Validates name (string, required)
        - Validates assignedTo (string, required)
        - Validates dueDate (date string, required)
        - Validates reward (number, optional)

   1.2. Sequence: Field Validation
        Checks that no keys beyond the ChoreObject type are entered.
        - id
        - name
        - assignedTo
        - dueDate
        - reward
        - completed

   1.3. Sequence: Type Validation
        ValidationResult must contain correct types for all fields:
        - name: string
        - assignedTo: string
        - dueDate: valid date string
        - reward: number
        - completed: boolean

   1.4. Default values are supplemented if missing:
        - reward: 10
        - completed: false
        - id: generated timestamp

2. Sequence: Store Operation
   [Process of storing the chore]
   - Add chore to in-memory store
   - Return created chore object
   - Handle any errors during storage
   - Validate storage success

3. Return
   Returns properly filled ChoreObject with:
   - All required fields
   - Generated ID
   - Default values applied
   - Validation completed 
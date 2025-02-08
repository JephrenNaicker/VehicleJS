# VehicleJS

## Database Setup

1. Navigate to the SQL script:
   - Path: `root/src/SQLScript`
2. Run the provided SQL script to create the database.

## Backend Setup

1. Install the required packages:
   ```bash
   npm install express cors mssql nodemon
   ```
2. Start the server:
   ```bash
   node server.cjs
   ```

## Frontend Setup

1. Update and install packages:
   ```bash
   npm install
   ```
2. Format the code:
   ```bash
   npm run format
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
root/
├── src/
│   └── SQLScript/        # SQL scripts for database setup
├── server.cjs            # Backend server file
└── package.json          # Project configuration
```

## Notes
- Ensure your SQL server is running before starting the backend server.
- Ensure that you update the credentials for the *Node.js* server in file 'server.cjs'


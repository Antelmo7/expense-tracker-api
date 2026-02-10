# expense-tracker-api
RESTful API to allow users to manage their expenses list.

## Installation and use
1. Clone the repository from GitHub using `git clone https://github.com/Antelmo7/expense-tracker-api`
2. Change to the new folder and run `npm install`
3. Create a .env file with the template from .env-example file and fill the variables with your credentiales from postgresql
4. Run `npm run dev`

### Auth
```json
POST /register
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "password"
}

RESPONSE:
{
  "token": ""
}


POST /login
{
  "email": "john@doe.com",
  "password": "password"
}

RESPONSE:
{
  "token": ""
}
```

### Expenses
```json
POST /api/expenses
{
    "description": "Dinner",
    "amount": 34,
    "category": "Groceries"
}

PATCH /api/expenses/:expenseId
{
    "description": "Dinner",
    "amount": 34,
    "category": "Groceries"
}

DELETE /api/expenses/:expenseId

GET /api/expenses

GET /api/expenses?page=1&limit=10

GET /api/expenses?page=1&limit=10&startDate=2025-11-10&endDate=2026-02-10

GET /api/expenses/pastweek

GET /api/expenses/pastmonth?page=1&limit=10

GET /api/expenses/past3months
```

**All the get endpoints suport pagination**

## Tech Stack
- Node.js
- Express.js
- Pino
- PostgreSQL

## Explanation

I implemented pino for logging and log different things between development and production, in development you will see all logs; in production will be saved on a `app.log` file to be able to recover them with any tool you use for it, and show only some information:

`npm install pino pino-pretty`

```javascript
import pino, { destination, levels, transport } from "pino";
const isProduction = process.env.NODE_ENV === 'production';

const developmentConfig = {
  level: 'debug', // levels to show
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname', // ignore this info
      translateTime: 'HH:MM:ss',
      levelFirst: true // format
    }
  }
}

const productionConfig = {
  level: 'info',
  transport: {
    target: 'pino/file', // save logs in a file that we can recovery later
    options: {
      destination: 'app.log',
      translateTime: 'yyyy-MM-dd-HH:MM:ss-Z',
      levelFirst: true
    }
  }
}

const config = isProduction ? productionConfig : developmentConfig;
const logger = pino(config);

export default logger;
```
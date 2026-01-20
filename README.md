# Doctor Twin

Doctor Twin is a physician-assist communication platform built with a strict MVC (Model–View–Controller) architecture. The system focuses on safe handling of patient messages, mandatory triage, and physician-controlled responses using pre-approved templates.

This repository contains the backend implementation using Node.js, TypeScript, Socket.IO, Prisma, and PostgreSQL, managed with Yarn.

---

## 📁 Folder Structure

```
.
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   ├── docs/
│   ├── validations/
│   ├── app.ts
│   ├── client.ts
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── .eslintrc.js
├── .prettierrc
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧠 Tech Stack

- Node.js + TypeScript
- PostgreSQL
- Prisma ORM
- Express.js
- JWT Authentication
- ESLint + Prettier

---

## ⚙️ Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/balaganesh77/Doctor-twin.git
cd doctor-twin
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=public
PORT=3000
JWT_SECRET=your_jwt_secret
```

---

## 🔧 Prisma Setup

```bash
yarn prisma init
yarn prisma migrate dev --name init
yarn prisma generate
```

---

## 🚀 Running the App

### Development

```bash
yarn dev
```

### Build & Production

```bash
yarn build
yarn start
```

## 🔐 JWT Authentication

- Generate token using `jwt.sign`
- Use middleware to verify token and attach user to `req.user`

---

## 🧹 ESLint + Prettier

Install:

```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier
```

`.eslintrc.js`:

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
};
```

`.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100
}
```

Format code:

```bash
yarn lint
yarn format
```

---

## 🚀 Deployment 
1. Push code to GitHub
2. Add environment variables (`DATABASE_URL`, `JWT_SECRET`)
3. Set start command: `yarn run`

---

## Development Guidelines

All new features must follow MVC separation

Controllers must not access the database directly

Views must remain stateless

Models must not contain workflow logic

## License

Private / Proprietary
All rights reserved.

# BookStore Learning Project - TypeScript Version

A comprehensive full-stack application built with Next.js, Prisma, SQLite, React, Redux, and TypeScript.

## Project Structure
```
BookStore/
├── DB/
│   └── database.db (SQLite database)
├── ClientApp/ (React Frontend with TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── LeftPanel.tsx
│   │   │   ├── CenterContent.tsx
│   │   │   ├── RightPanel.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookModal.tsx
│   │   │   └── Pagination.tsx
│   │   ├── store/
│   │   │   ├── store.ts
│   │   │   ├── slices/
│   │   │   │   ├── booksSlice.ts
│   │   │   │   └── cartSlice.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── ServerApp/ (Next.js Backend with TypeScript)
    ├── pages/
    │   └── api/
    │       ├── books/
    │       │   ├── index.ts
    │       │   └── [id].ts
    │       └── categories.ts
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── lib/
    │   └── prisma.ts
    ├── types/
    │   └── index.ts
    ├── package.json
    ├── tsconfig.json
    └── next.config.js
```

## Setup Instructions

### 1. Initialize the Project
```bash
mkdir BookStore
cd BookStore
mkdir DB ClientApp ServerApp
```

### 2. Setup ServerApp (Next.js Backend)
```bash
cd ServerApp
npm init -y
npm install next react react-dom prisma @prisma/client
npm install -D @types/node @types/react @types/react-dom typescript
```

### 3. Setup ClientApp (React Frontend)
```bash
cd ../ClientApp
npm create vite@latest . -- --template react-ts
npm install @reduxjs/toolkit react-redux axios
npm install -D @types/node
```

### 4. Environment Setup
Create `.env` in ServerApp:
```
DATABASE_URL="file:../DB/database.db"
```

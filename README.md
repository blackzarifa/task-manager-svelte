# Task Manager

A simple task manager built with Svelte 5 + SvelteKit + Skeleton UI. Started as a learning project to explore Svelte.

## Technologies

- **Frontend**: Svelte 5 + Sveltekit
- **UI**: Skeleton UI + Tailwind CSS
- **Storage**: Currently using localStorage (DB integration ready)

## Features

- Create/Edit/Delete tasks
- Task completion tracking
- Due date management
- Responsive UI 
- Error handling & form validation

## Project Structure

```
src/
├── lib/                      # Components and utilities
│   ├── components/
│   │   ├── common/          
│   │   └── tasks/           # Task-specific components
│   └── types/               # TypeScript definitions
├── routes/                  # SvelteKit routes
└── app.html                 # Base template
```

## Setup

1. Clone & install:
```bash
git clone https://github.com/blackzarifa/task-manager-svelte.git
cd task-manager-svelte
pnpm install
```

2. Run dev server:
```bash
pnpm dev
```


## What's Missing

Honestly I got too tired of coding this project and will move to something else, but this is what I was planning to do:

- Backend integration
- Task filtering/sorting
- User authentication

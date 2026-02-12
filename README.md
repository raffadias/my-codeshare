# My CodeShare

A real-time collaborative code sharing application that allows multiple users to write, edit, and share code together in dedicated rooms.

## Features

- **Real-time Code Editing**: Collaborate on code with instant synchronization across all participants
- **Room-Based Sharing**: Create or join code sharing rooms with unique identifiers
- **Live Code Editor**: Powerful code editor with syntax highlighting and language support
- **TypeScript Support**: Full type safety across the entire application
- **Modern UI**: Clean and intuitive user interface built with React

## Project Structure

```
my-codeshare/
├── backend/          # Node.js server application
│   ├── server.ts     # Main server entry point
│   └── package.json  # Backend dependencies
│
└── frontend/         # React web application
    ├── src/
    │   ├── App.tsx              # Main app component
    │   ├── main.tsx             # Entry point
    │   ├── components/          # Reusable components
    │   │   └── CodeEditor/      # Code editor component
    │   └── pages/               # Page components
    │       ├── Home/            # Landing/home page
    │       └── Room/            # Code sharing room page
    ├── vite.config.ts           # Vite configuration
    ├── tsconfig.json            # TypeScript configuration
    └── package.json             # Frontend dependencies
```

## Tech Stack

### Backend

- **Node.js**: JavaScript runtime
- **TypeScript**: Type-safe server code
- **Express** (likely): Web framework
- **Real-time Communication**: WebSockets or similar for live collaboration

### Frontend

- **React**: UI framework
- **TypeScript**: Type-safe React components
- **Vite**: Fast build tool and dev server
- **ESLint**: Code quality and linting
- **CSS**: Styled components with modular CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-codeshare
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

#### Start the Backend Server

```bash
cd backend
npm run dev
```

The server will typically run on `http://localhost:3000` or `http://localhost:5000`

#### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will typically run on `http://localhost:5173` (Vite default)

### Building for Production

#### Backend

```bash
cd backend
npm run build
```

#### Frontend

```bash
cd frontend
npm run build
```

Production build will be in the `dist/` directory.

## Usage

1. **Home Page**: Start on the home page to create or join a code sharing room
2. **Room Page**: Join a specific room using a room identifier
3. **Code Editor**: Write and edit code in the embedded code editor
4. **Collaboration**: All changes are synchronized in real-time with other users in the same room

## Environment Variables

Create `.env` files in both backend and frontend directories with necessary configuration:

### Backend `.env`

```
PORT=3000
NODE_ENV=development
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:3000
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please create an issue in the repository.

# Airdrop Next.js Application

Airdrop tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Free Airdrops**: Browse and search through free airdrop opportunities
- **Paid Airdrops**: Discover paid airdrop campaigns
- **Ended Airdrops**: View completed airdrop campaigns
- **Dark Mode**: Toggle between light and dark themes
- **Search & Filter**: Advanced search and filtering capabilities
- **Responsive Design**: Optimized for all device sizes

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API**: Fetch API with custom hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd airdrop
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure your API endpoint:
   - Open `lib/api.ts`
   - Replace `API_BASE_URL` with your actual API endpoint

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
airdrop/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (Free Airdrops)
│   ├── paid/page.tsx      # Paid Airdrops page
│   ├── ended/page.tsx     # Ended Airdrops page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── SearchBar.tsx      # Search functionality
│   ├── FilterDropdown.tsx # Filter options
│   ├── AirdropTable.tsx   # Data table
│   └── LoadingSpinner.tsx # Loading indicator
├── hooks/                 # Custom React hooks
│   └── useAirdropData.ts  # Data fetching logic
├── lib/                   # Utility functions
│   └── api.ts            # API integration
├── types/                 # TypeScript type definitions
│   └── airdrop.ts        # Airdrop data types
└── public/               # Static assets
```

## API Integration

The application expects the following API endpoints:

- `GET /api/free` - Get free airdrops
- `GET /api/paid` - Get paid airdrops  
- `GET /api/ended` - Get ended airdrops
- `GET /api/{type}/search/{term}` - Search airdrops

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
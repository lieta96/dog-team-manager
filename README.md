# Dog Team Manager

This project is a **coding challenge** that involves building a full-stack Next.js application that allows users to explore dog breeds, create their personal dog team, and manage it with persistent storage.

## Technical Requirements

- **Framework**: Next.js
- **Frontend**: React with TypeScript preferred
- **Backend**: Next.js API routes
- **Database**: SQlite
- **Styling**: Your choice
- **API Proxy**: Use Next.js API routes to proxy the Dog API calls (don't call the Dog API directly from the frontend)
- **Error Handling**: Add proper error handling and validation
## Implemented Features 

### 1. Dog Breeds Explorer

- Server-rendered page that fetches and displays a list of dog breeds using the [Dogs API](https://dog.ceo/dog-api)
- Search functionality with debounce to filter breeds by name
- Clicking on a breed navigates to a dynamic breed page

### 2. Breed Details Page

- Displays a paginated list of dog images for the selected breed
- Traditional pagination implementation

The Dog CEO API does not offer paginated endpoints, so when requesting images of a breed, all images are received in a single response. Opting for traditional pagination is clearer and more intuitive for the user, who can explicitly see how many pages there are and navigate between them with greater control. Furthermore, this option improves accessibility and avoids common problems with infinite scroll, such as losing your position when going back or difficulty navigating within the content.
- Each dog image has an ‘Add to my team’ / ‘Remove from my team’ button.

The 'Remove from my team' button was not requested for this view. However, I thought it would improve usability. Otherwise, if a user clicked on a dog by mistake, they would have to go to 'My team' to remove it.
- Each dog has a unique ID when added to the team
- Accessible Error Handling: Validation of limits with accessible error dialogs using [Headless UI](https://headlessui.com/). Instead of using browser alerts, the application displays user-friendly modal dialogs that are fully accessible, including keyboard navigation and screen reader support.

### 3. My Team Dashboard

- Dedicated page displaying the user's team
- Groups dogs by breed in the UI
- Displays breed name and images of dogs
- Includes a button to remove each dog
- Maximum of 10 dogs per team
- Maximum of 3 dogs of the same breed

- Persistent Storage: The team state is persisted using localStorage, ensuring that the user's team selection is maintained across page reloads and browser sessions. This provides a seamless user experience without losing the team configuration.

## Project Structure

```
app/
├── api/                    # API routes (proxy for Dog API)
│   ├── breeds/            # Endpoint to get all breeds
│   └── images-by-breed/   # Endpoint to get images by breed
├── breed/
│   └── [slug]/            # Dynamic breed details page
├── my-team/               # Team dashboard
├── components/            # Reusable components
│   ├── dogCard.js         # Individual dog card
│   ├── dogsList.js        # Paginated list of dogs
│   ├── myTeam.js          # Team component
│   ├── navbar.js          # Navigation bar
│   ├── pagination.js      # Pagination component
│   └── search.js          # Search component
└── context/
    └── teamContext.js     # Context for team state management
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components for React (used for error dialogs)
- **localStorage** - Client-side persistent storage for team state
- **React Context** - Global state management


# Homivio

Homivio is a modern e-commerce storefront for home decor, curated furniture, and interior lifestyle products. Built on Next.js 15 (App Router), React 19, and Tailwind CSS, the platform delivers a complete shopping experience with responsive product catalogs, client-side cart persistence, Stripe checkout integration, and an administrative inventory manager.

## Table of Contents

- Overview
- Architecture and Directory Layout
- Storefront Features
- Technology Stack
- State Management and Cart Engine
- Payment Processing with Stripe
- Administrative Inventory Control
- Environment Configuration
- Getting Started
- Available Scripts
- License

## Overview

Homivio is designed for fast product discovery, seamless checkout conversion, and flexible inventory curation. It combines server-side rendering for optimal SEO and rapid initial paint with client-side reactive state management to deliver an uninterrupted shopping experience across mobile, tablet, and desktop viewports.

## Architecture and Directory Layout

The codebase follows the Next.js App Router structure with modular components and isolated styling configurations:

```
homivio/
├── package.json               # Project manifest and dependencies
├── next.config.js             # Next.js build configuration
├── tailwind.config.js         # Tailwind styling themes and breakpoint tokens
├── theme.js                   # Color palette and typography definitions
├── ecommerce.config.js        # Storefront metadata and navigation configuration
├── jsconfig.json              # Path aliases and compiler options
├── public/                    # Static image assets, mockups, and product photos
├── app/                       # App Router routes and pages
│   ├── layout.jsx             # Root layout with navbar, cart status, and toast container
│   ├── page.jsx               # Storefront homepage with hero and featured collections
│   ├── categories/            # All categories overview
│   ├── category/
│   │   └── [name]/            # Dynamic category catalog route
│   ├── product/
│   │   └── [name]/            # Dynamic product detail route
│   ├── cart/                  # Shopping cart management page
│   ├── checkout/              # Stripe Elements checkout interface
│   └── admin/                 # Product inventory management dashboard
├── components/                # Reusable React UI components
│   ├── Button.jsx             # Standardized button component
│   ├── CartLink.jsx           # Reactive cart badge indicator
│   ├── Image.jsx              # Optimized image wrapper
│   ├── Inventory.jsx          # Inventory card layout
│   ├── ListItem.jsx           # Product list item view
│   ├── QuantityPicker.jsx     # Increment and decrement quantity selector
│   ├── ViewInventory.jsx      # Inventory table and editor view
│   ├── formComponents/        # Admin and checkout form fields
│   └── heroComponents/        # Homepage hero sections and banners
├── context/
│   └── mainContext.jsx        # Global cart state engine with localStorage sync
└── styles/                    # Global stylesheets and CSS variables
```

## Storefront Features

### Product Discovery and Browsing
- Responsive Product Catalogs: Browse collections by category (living room, bedroom, seating, lighting, decor) with sorting and filtering options.
- Dynamic Product Detail Views: High-resolution image displays, variant selectors, detailed dimensions, material specifications, and real-time inventory availability.
- SEO and Metadata: Dynamic open graph cards and title tags automatically generated for each product and category view.

### Shopping Cart Experience
- Persistent Cart State: Products added to the cart remain available across page refreshes and subsequent visits via browser `localStorage` integration.
- Instant Cart Updates: Real-time item additions, quantity adjustments, and deletions without page reloading.
- Cart Drawer and Badge: Floating navigation indicators showing the exact item count and running subtotal.

### Secure Checkout
- Stripe Elements Integration: Compliant payment fields collecting card information securely without sensitive data touching the application server.
- Order Summary Calculation: Automatic tax computation, shipping calculations, and subtotal rollups.

### Administrative Inventory Management
- Centralized Admin Interface: Accessible at `/admin` to review current catalog items.
- Dynamic Product Controls: Add new products, edit item titles, adjust prices, update descriptions, and remove discontinued stock.

## Technology Stack

- Framework: Next.js 15.1 (App Router)
- Core Library: React 19.0, React DOM 19.0
- Styling: Tailwind CSS 3.4, PostCSS, Autoprefixer
- Payment Gateway: Stripe SDK (`stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js`)
- State Management: React Context API with LocalStorage synchronization
- Notifications: React Toastify
- Icons: React Icons
- Identifiers: UUID v10
- Code Quality: ESLint, Prettier

## State Management and Cart Engine

The application state is centralized in `context/mainContext.jsx`:
- Action Dispatches: Includes `addToCart`, `removeFromCart`, `updateQuantity`, and `clearCart`.
- LocalStorage Synchronization: Whenever cart state modifies, the engine automatically serializes the payload to browser storage and rehydrates on initial application mount.
- Performance: Utilizes memoized values to prevent unnecessary re-renders across static components.

## Payment Processing with Stripe

Payment transactions are coordinated using Stripe Elements:
1. When a user navigates to `/checkout`, the application compiles cart line items into an order intent.
2. A payment intent is created via the Stripe API with the calculated amount.
3. The client renders the Stripe Card Element, validating card inputs and handling 3D Secure verification directly with Stripe.
4. On successful confirmation, the shopping cart clears and the user receives an on-screen order confirmation.

## Administrative Inventory Control

The administrative panel allows store operators to adjust the product catalog directly:
- Inventory Viewer (`components/ViewInventory.jsx`): Displays an overview of active stock items with immediate inline deletion and price updates.
- Item Creator: Form inputs validating image URLs, category assignments, pricing numbers, and stock status.

## Environment Configuration

Create a `.env.local` file in the root directory:

| Variable | Description | Example / Default |
| --- | --- | --- |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key for client elements | pk_test_... |
| STRIPE_SECRET_KEY | Stripe secret key for backend payment intent generation | sk_test_... |
| NEXT_PUBLIC_SITE_URL | Base URL of the deployed application | http://localhost:3000 |

## Getting Started

### Prerequisites
- Node.js version 18.x or higher
- npm version 9.x or higher
- Active Stripe account (test credentials)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd homivio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local` as described in the configuration section.

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your web browser.

## Available Scripts

- `npm run dev`: Starts Next.js development server.
- `npm run build`: Compiles production build.
- `npm run start`: Runs production server.
- `npm run lint`: Checks source code with ESLint.
- `npm run type-check`: Verifies TypeScript types without emitting files.

## License

This project is licensed under the MIT License.

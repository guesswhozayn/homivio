# Homivio — Modern Next.js E-commerce

Homivio is a fully configurable, modern e-commerce storefront built with Next.js (App Router), React, and Tailwind CSS. It features a complete product catalog, shopping cart state management, checkout integration with Stripe, and an admin dashboard interface.

---

## Features

- **Dynamic Catalog**: Browse categories (e.g., sofas, chairs) and products with rich descriptions, pricing, and high-quality visuals.
- **Global Shopping Cart**: Fully reactive React Context state engine synchronized with browser `localStorage` for cart persistence.
- **Admin Dashboard**: Manage inventory state (add, edit, and delete products) with a modular admin interface.
- **Payment Readiness**: Integrated with Stripe elements for secure checkout forms.
- **SEO & Metadata**: Dynamic metadata and open-graph tags generated automatically per product and category.
- **Responsive Layout**: Pixel-perfect responsive styling tailored for mobile, tablet, and desktop viewports.

---

## Tech Stack

- **Core**: Next.js 15, React 19, React DOM 19
- **State Management**: React Context API
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Payments**: Stripe SDK (`@stripe/stripe-js`, `@stripe/react-stripe-js`)
- **Notifications**: React Toastify
- **Icons**: React Icons
- **Unique Identifiers**: UUID

---

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/homivio.git
   cd homivio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## Project Structure

```text
├── app/                  # Next.js App Router routes & layouts
│   ├── admin/            # Admin dashboard page
│   ├── cart/             # Shopping cart page
│   ├── categories/       # Category index page
│   ├── category/         # Category specific route groups
│   ├── checkout/         # Stripe checkout forms
│   └── product/          # Product detail client & server views
├── components/           # Reusable UI component library
│   ├── formComponents/   # Admin and user authentication forms
│   └── heroComponents/   # Custom marketing display components
├── context/              # React Context provider (mainContext.jsx)
├── public/               # Static assets (images, fonts, products)
├── snippets/             # Backend serverless deployment helpers (e.g. AWS Lambda / Stripe payment handler)
├── styles/               # Global CSS styles (Tailwind config hooks)
├── utils/                # Data and inventory helper engines
├── ecommerce.config.js   # Global storefront configurations
├── tailwind.config.js    # Tailwind layout utility configurations
└── next.config.js        # Next.js optimization compiler parameters
```

---

## ⚙️ Configuration

Storefront properties, such as category navigation display counts, can be changed dynamically in `ecommerce.config.js`:

```javascript
const navItemLength = 5;

export { navItemLength };
```

---

## 🔒 Admin Panel & Authentication

The storefront includes a functional mock user account and administrator portal:
- Sign Up & Sign In flows configured to control workspace authorization state.
- Inventory control panel supporting live edits, stock checks, and removal of items locally.

---

## 💳 Stripe Integration

Stripe payment elements are instantiated globally under the checkout module using your API credentials:

```javascript
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("your-stripe-publishable-key");
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
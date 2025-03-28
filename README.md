<p align="center">
  <p align="center">
   <img width="150" height="150" src="public/heuvera.png" alt="Heuvera's logo">
  </p>
	<h1 align="center"><b>Heuvera</b></h1>
	<p align="center">
		Heuvera is where to find a place.
  </p>
</p>

**Heuvera** is an AI-powered property marketplace built to make finding and listing short-term rentals seamless. Whether you're searching for a unique stay or looking to earn from your space, Heuvera connects you with the right opportunities while keeping the experience intuitive, secure, and efficient.

## Features

### For Guests

- Browse **handpicked stays**, from cozy apartments to luxury villas.
- **AI-powered recommendations** tailored to your travel style.
- Secure booking and **hassle-free payments**.
- Reviews and ratings to make informed choices.
- Save favorite properties to your **wishlist**.

### For Hosts

- **List your property** with an easy-to-use dashboard.
- **Smart pricing suggestions** based on demand and trends.
- Track bookings, earnings, and performance with **real-time analytics**.
- Secure payouts and flexible payment options.
- **Host approval system** to maintain quality listings.

## Tech Stack

- **Frontend:** Next.js (TypeScript, TailwindCSS).
- **Backend:** Next.js API routes (Node.js & Prisma ORM).
- **Database:** PostgreSQL.
- **State Management:** Zustand.
- **Caching & Queues:** Upstash Redis, BullMQ.
- **Deployment:** Vercel.
- **API Documentation:** Swagger.

## Getting Started

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/heuvera/heuvera.git
cd heuvera
bun install
```

### Environment Setup

Create a `.env` file in the project root and add your configuration:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database?schema=public
SENTRY_AUTH_TOKEN=
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
HEUVERA_API_KEY=
PLUNK_API_KEY=
PLUNK_API_URL=
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
REDIS_URL=
REDIS_HOST=
REDIS_PORT=
REDIS_URLS=
AUTH0_ISSUER=
AUTH0_AUDIENCE=

```

### Running Locally

```sh
bun run dev
```

## Contributing

We’re always looking to improve Heuvera. If you’d like to contribute, feel free to open an issue or submit a pull request.

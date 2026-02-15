# Stock Bot Dashboard

Modern admin dashboard for managing stock portfolio and morning scan watchlist. Built with Next.js 14 and Supabase.

## Setup Instructions

### 1. Database Setup (Supabase)
1.  Create a new project in [Supabase](https://supabase.com/).
2.  Go to the **SQL Editor** in your Supabase dashboard.
3.  Copy the contents of `supabase_schema.sql` and run it to create the necessary tables (`portfolio`, `watchlist`).
4.  Get your project credentials from **Project Settings > API**.
    -   `URL`
    -   `anon` public key

### 2. Environment Configuration
1.  Open `.env.local` in this directory.
2.  Replace the placeholders with your actual Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
-   **Portfolio Management**: Add, edit, delete stocks with notes.
-   **Morning Scout Watchlist**: View SET50 stocks, toggle favorites, and filter by favorites.
-   **Responsive Design**: Dark mode UI with glassmorphism effects.

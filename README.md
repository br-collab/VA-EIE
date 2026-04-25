# VA-EIE — VA Evidence Intelligence Engine

A licensed IP pitch application targeting federal VA contract delivery through Eleven09/KSTP.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your Anthropic API key to `.env.local`:
   ```
   ANTHROPIC_API_KEY=your_key_here
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```

## Deployment

Configured for Railway via `railway.json`. Connect GitHub repo to Railway project, set `ANTHROPIC_API_KEY` as an environment variable in Railway dashboard.

## Architecture

See `CLAUDE.md` for full product context, color system, component architecture, data schemas, and API route contract.

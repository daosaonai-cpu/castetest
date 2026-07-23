# Student MIS Registration

An Express + EJS registration portal for a Student Management Information System.
Form submissions (text + uploaded documents) are relayed to a Telegram chat from
the **server**, so the bot token is never exposed to the browser.

## Structure

```
student-mis/
├── server.js               # App entry point
├── package.json
├── .env                    # Secrets (BOT_TOKEN, CHAT_ID, PORT) — not committed
├── routes/formRoutes.js    # Routes + multer file-upload config
├── controllers/formController.js  # Renders form, builds message, calls Telegram
├── services/telegram.js    # sendMessage / sendDocument via Telegram Bot API
├── uploads/                # Saved uploads (photos / signatures / documents)
├── views/form.ejs          # Registration form + success view
└── public/
    ├── css/style.css
    └── js/form.js          # Address logic + fetch submit (no secrets)
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure `.env` (copy from `.env.example`):

   ```
   PORT=3000
   BOT_TOKEN=your-telegram-bot-token
   CHAT_ID=your-telegram-chat-id
   ```

   > ⚠️ The previous bot token was exposed in old client-side code. Revoke it in
   > [@BotFather](https://t.me/BotFather) and use the new one here.

3. Run:

   ```bash
   npm start      # or: npm run dev  (auto-reload via nodemon)
   ```

4. Open <http://localhost:3000>.

## How it works

- `GET /` renders the form (`views/form.ejs`).
- `POST /submit` — multer saves the three files into `uploads/`, the controller
  builds a Markdown summary, and `services/telegram.js` sends the text plus each
  document to your Telegram chat. Responds with JSON `{ ok, reference }`.

## File limits

| Field      | Types         | Max size |
|------------|---------------|----------|
| photo      | JPG / PNG     | 2 MB     |
| signature  | JPG / PNG     | 1 MB     |
| marksheet  | PDF / JPG/PNG | 5 MB     |

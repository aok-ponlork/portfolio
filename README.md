# 🧠 Portfolio

This is the project of my portfolio. It includes features like token-based route protection, secure access, and serverless cloud functions to show the stack I've worked with and the skills I’ve built.

---

## 🛠 Tech Stack

- **Frontend**: Angular + TailwindCSS + Ant Design + Lottie Animation
- **Backend Logic**: Cloudflare Functions (Serverless)
- **Authentication**: JWT 
- **Deployment**: Cloudflare Pages + Cloudflare Runtime Environment

---

## 🔐 Protected Route (`/app/more-info`)

Some parts of this portfolio — like the "More Info" section — are protected to demonstrate my expertise in:

- Token-based route protection
- Stateless authentication with JWT
- Serverless validation using Cloudflare Functions
- Secure, time-limited link generation
- Cloudflare runtime environment configuration

This simulates a real-world SaaS platform where access to certain resources is restricted.

---

### ⚠️ Why is the Token in the URL?

The access token is passed in the URL (e.g. `?token=yourJWT`) for the sake of simplicity and demonstration. 

Here’s why:
- It allows easy access for users (even non-technical) to access the content directly
- The token **expires after 1 hour**
- The data is non-sensitive — this is a technical demonstration

> **Note:** In a production environment, passing sensitive tokens via the URL is discouraged due to security concerns.

---

## 📨 Request Access Flow

1. **User enables “Request Mode”** and fills out the form on the contact page — sending the request via email or Telegram (bot).
2. **I manually review** the request. If the user looks legit, I approve it.
3. **I generate a secure, short-lived access link** containing a JWT token.
4. The token is created through an internal API — **only I have access to this**, and the secret key **rotates regularly** for added security.
5. I **send the access link back** to the user (via email or Telegram).
6. The link looks like:  `https://ponlork.pages.dev/app/more-info?token=ey...`
7. Cloudflare Function validates the token and **grants access** if it’s valid and not expired.


---


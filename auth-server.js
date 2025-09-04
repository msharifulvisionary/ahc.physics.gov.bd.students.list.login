const express = require("express")
const cors = require("cors")
const crypto = require("crypto")

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-domain.com",
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      process.env.GITHUB_PAGES_URL || "https://your-github-pages-url.github.io",
    ].filter(Boolean),
  }),
)

app.use(express.json())

app.get("/api/auth", (req, res) => {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "private_ocuHLfwK9n883Jf7W+xt4TAQGUY="
    const token = req.query.token || crypto.randomUUID()
    const expire = req.query.expire || Math.floor(Date.now() / 1000) + 2400

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex")

    res.json({
      token: token,
      expire: expire,
      signature: signature,
    })
  } catch (error) {
    console.error("Authentication error:", error)
    res.status(500).json({ error: "Authentication failed" })
  }
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app

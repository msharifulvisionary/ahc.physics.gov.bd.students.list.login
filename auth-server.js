// Backend server for ImageKit authentication
// This needs to be deployed separately (e.g., on Vercel, Netlify Functions, or any Node.js server)

const express = require("express")
const cors = require("cors")
const ImageKit = require("imagekit")

const app = express()

// Enable CORS for your domain
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-domain.com", "https://your-github-pages-url.github.io"],
  }),
)

app.use(express.json())

// ImageKit configuration
const imagekit = new ImageKit({
  publicKey: "public_hVAN26ygTqOwXiKvqHBCVcY6jXA=",
  privateKey: "private_ocuHLfwK9n883Jf7W+xt4TAQGUY=",
  urlEndpoint: "https://ik.imagekit.io/msharifulvisionary",
})

// Authentication endpoint for ImageKit
app.get("/auth", (req, res) => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters()
    res.json(authenticationParameters)
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

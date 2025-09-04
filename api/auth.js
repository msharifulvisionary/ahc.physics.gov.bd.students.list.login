export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  if (req.method === "GET") {
    try {
      const crypto = require("crypto")

      const privateKey = process.env.IMAGEKIT_PRIVATE_KEY

      if (!privateKey) {
        console.error("IMAGEKIT_PRIVATE_KEY environment variable is not set")
        return res.status(500).json({
          error: "ImageKit private key not configured",
          message: "Please set IMAGEKIT_PRIVATE_KEY environment variable in Vercel",
        })
      }

      const token = req.query.token || crypto.randomUUID()
      const expire = req.query.expire || Math.floor(Date.now() / 1000) + 2400

      const signature = crypto
        .createHmac("sha1", privateKey)
        .update(token + expire)
        .digest("hex")

      console.log("[v0] ImageKit auth successful for token:", token)

      res.status(200).json({
        token: token,
        expire: expire,
        signature: signature,
      })
    } catch (error) {
      console.error("ImageKit auth error:", error)
      res.status(500).json({ error: "Authentication failed", details: error.message })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}

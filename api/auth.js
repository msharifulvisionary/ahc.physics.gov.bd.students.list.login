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
    const crypto = require("crypto")

    const privateKey = "private_ocuHLfwK9n883Jf7W+xt4TAQGUY="
    const token = req.query.token || crypto.randomUUID()
    const expire = req.query.expire || Math.floor(Date.now() / 1000) + 2400

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex")

    res.status(200).json({
      token: token,
      expire: expire,
      signature: signature,
    })
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}

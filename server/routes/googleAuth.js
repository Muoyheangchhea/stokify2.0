const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const db = require("../db");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google authentication endpoint
router.post("/google", async (req, res) => {
  try {
    const { email, name, googleId, picture, role } = req.body; // Add role here

    console.log(
      "📧 Google auth request for:",
      email,
      "Role:",
      role || "not specified",
    );

    if (!email || !googleId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    let user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      // Create new user with the selected role (default to 'user' if not specified)
      const userRole = role || "user";

      console.log(
        "🆕 Creating new user from Google account with role:",
        userRole,
      );

      const newUser = await db.query(
        "INSERT INTO users (name, email, password, role, google_id, picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, picture, created_at",
        [
          name || email.split("@")[0],
          email,
          "GOOGLE_AUTH_" + Date.now(),
          userRole,
          googleId,
          picture || null,
        ],
      );
      user = newUser;
    } else {
      // Update google_id if not set, but preserve existing role
      if (!user.rows[0].google_id) {
        console.log("🔄 Linking Google account to existing user:", email);

        await db.query(
          "UPDATE users SET google_id = $1, picture = COALESCE($2, picture) WHERE email = $3",
          [googleId, picture, email],
        );

        // Refresh user data
        user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        email: user.rows[0].email,
        role: user.rows[0].role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    console.log(
      "✅ Google auth successful for:",
      email,
      "Role:",
      user.rows[0].role,
    );

    // Return user data and token
    res.json({
      success: true,
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
        picture: user.rows[0].picture,
        created_at: user.rows[0].created_at,
      },
    });
  } catch (error) {
    console.error("❌ Google auth error:", error);
    res
      .status(500)
      .json({ message: "Server error during Google authentication" });
  }
});

module.exports = router;

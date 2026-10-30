import express from "express";
import cors from "cors";
import pool from "./db.js";
import argon2 from "argon2";
import session from "express-session";

// SERVER SETUP
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);

// ========================================
// AUTHENTICATION API
// ========================================

// SIGNUP
app.post("/api/auth/signup", async (req, res) => {
  try {
    // Get user input
    const email = req.body.email;
    const password = req.body.password;

    // Check for missing input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Hash password
    const passwordHash = await argon2.hash(password);

    // Save user to database
    await pool.query(
      `INSERT INTO users(email, Password_hash)
      VALUES ($1, $2)`,
      [email, passwordHash],
    );

    // Signup successful
    res.status(201).json({
      message: "Account created successfully",
    });

    // Handle server errors
  } catch (error) {
    console.error(error);

    // Check for duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    res.status(500).json({
      error: "Failed to sign up",
    });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isValidPassword = await argon2.verify(user.password_hash, password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    req.session.userId = user.id;

    return res.status(200).json({
      message: "Successfully logged in",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to log in",
    });
  }
});

// Check current user session
app.get("/api/auth/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const result = await pool.query(
      `SELECT id, email FROM users WHERE id = $1`,
      [req.session.userId],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get current user",
    });
  }
});

// ========================================
// CHILDREN REST API
// ========================================

// READ CHILD
app.get("/api/children", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM children");

    console.log(result.rows);

    // Format the data for React
    const formattedChildren = result.rows.map((child) => {
      return {
        id: child.id,

        profile: {
          name: child.name,
          gender: child.gender,
          birthDate: child.birth_date,
          profileImage: child.profile_image,
        },

        currentStats: child.current_stats,
        insight: child.insight,

        // Temporary until connect records
        growthRecords: [],
        sleepRecords: [],
        feedingRecords: [],
      };
    });

    // Send formatted data to React
    res.json(formattedChildren);
  } catch (error) {
    // Handle errors
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch children",
    });
  }
});

// CREATE CHILD
app.post("/api/children", async (req, res) => {
  try {
    const newChild = req.body;

    const name = newChild.profile.name;
    const gender = newChild.profile.gender;
    const birthDate = newChild.profile.birthDate;

    const result = await pool.query(
      `INSERT INTO children (name, gender, birth_date)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, gender, birthDate],
    );
    const createdChild = result.rows[0];

    const formattedChild = {
      id: createdChild.id,

      profile: {
        name: createdChild.name,
        gender: createdChild.gender,
        birthDate: createdChild.birth_date,
        profileImage: createdChild.profile_image,
      },

      currentStats: createdChild.current_stats,
      insight: createdChild.insight,

      growthRecords: [],
      sleepRecords: [],
      feedingRecords: [],
    };

    res.status(201).json(formattedChild);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create child",
    });
  }
});

// UPDATE CHILD
app.put("/api/children/:childId", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    const updatedData = req.body;

    const name = updatedData.profile.name;
    const gender = updatedData.profile.gender;
    const birthDate = updatedData.profile.birthDate;

    const result = await pool.query(
      `UPDATE children
      SET 
      name = $1,
      gender = $2,
      birth_date = $3

      WHERE id = $4
      RETURNING *`,
      [name, gender, birthDate, childId],
    );

    const updatedChild = result.rows[0];

    if (!updatedChild) {
      return res.status(404).json({
        error: "Child not found",
      });
    }

    const formattedChild = {
      id: updatedChild.id,
      profile: {
        name: updatedChild.name,
        gender: updatedChild.gender,
        birthDate: updatedChild.birth_date,
        profileImage: updatedChild.profile_image,
      },
      currentStats: updatedChild.current_stats,
      insight: updatedChild.insight,

      growthRecords: [],
      sleepRecords: [],
      feedingRecords: [],
    };

    res.status(200).json(formattedChild);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update child",
    });
  }
});

// DELETE CHILD
app.delete("/api/children/:childId", async (req, res) => {
  try {
    const childId = Number(req.params.childId);

    const result = await pool.query(
      `DELETE FROM children
      WHERE id = $1
      RETURNING *`,
      [childId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Child not found",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to delete child",
    });
  }
});
// ========================================
// GROWTH RECORDS REST API
// ========================================

// READ GROWTH RECORD
app.get("/api/children/:childId/growthRecords", async (req, res) => {
  try {
    const childId = Number(req.params.childId);

    // Fetch growth records for the selected child from PostgreSQL
    const result = await pool.query(
      "SELECT * FROM growth_records WHERE child_id = $1",
      [childId],
    );

    // Format the data for React
    const formattedGrowthRecords = result.rows.map((record) => {
      return {
        id: record.id,
        childId: record.child_id,
        date: record.date,
        height: Number(record.height),
        weight: Number(record.weight),
        note: record.note ?? "",
      };
    });
    // Send formatted data to react
    res.json(formattedGrowthRecords);
  } catch (error) {
    //Handle errors
    console.error(error);

    // Send a 500 error response if fetching growth records fails
    res.status(500).json({
      error: "Failed to fetch GrowthRecords",
    });
  }
});

// CREATE GROWTH RECORD
app.post("/api/children/:childId/growthRecords/", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    const newRecord = req.body;

    // Validate child id
    if (!Number.isInteger(childId) || childId <= 0) {
      return res.status(400).json({
        error: "Invalid child ID",
      });
    }

    // Validate date
    if (!newRecord.date || Number.isNaN(new Date(newRecord.date).getTime())) {
      return res.status(400).json({
        error: "Invalid date",
      });
    }

    // Validate height
    if (
      newRecord.height === "" ||
      newRecord.height === null ||
      newRecord.height === undefined ||
      !Number.isFinite(Number(newRecord.height)) ||
      Number(newRecord.height) <= 0
    ) {
      return res.status(400).json({
        error: "Invalid height",
      });
    }

    // Validate weight
    if (
      newRecord.weight === "" ||
      newRecord.weight === null ||
      newRecord.weight === undefined ||
      !Number.isFinite(Number(newRecord.weight)) ||
      Number(newRecord.weight) <= 0
    ) {
      return res.status(400).json({
        error: "Invalid weight",
      });
    }

    // Insert the new growth record into PostgreSQL
    const result = await pool.query(
      `INSERT INTO growth_records 
      (child_id, date, height, weight, note)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        childId,
        newRecord.date,
        newRecord.height,
        newRecord.weight,
        newRecord.note ?? "",
      ],
    );
    // Get the newly saved record from PostgreSQL
    const record = result.rows[0];

    const savedRecord = {
      id: record.id,
      childId: record.child_id,
      date: record.date,
      height: Number(record.height),
      weight: Number(record.weight),
      note: record.note ?? "",
    };
    // Send the saved record back to React with status 201
    res.status(201).json(savedRecord);
  } catch (error) {
    //Handle errors
    console.error(error);

    // Send a 500 error response if fetching growth records fails
    res.status(500).json({
      error: "Failed to create growthRecords",
    });
  }
});

// UPDATE GROWTH RECORD
app.put("/api/children/:childId/growthRecords/:recordId", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    const recordId = Number(req.params.recordId);
    const { date, height, weight, note } = req.body;

    // Validate height
    if (!Number.isFinite(height) || height <= 0) {
      return res.status(400).json({
        error: "Height must be a positive number",
      });
    }
    // Validate weight
    if (!Number.isFinite(weight) || weight <= 0) {
      return res.status(400).json({
        error: "Weight must be a positive number",
      });
    }

    const result = await pool.query(
      `UPDATE growth_records
      SET
      date = $1,
      height = $2,
      weight = $3,
      note = $4
      
      WHERE id = $5 AND child_id = $6
      RETURNING *`,
      [date, height, weight, note, recordId, childId],
    );
    // Get the upadted record from PostgreSQL
    const updatedRecord = result.rows[0];

    // Return 404 if the growth record does not exist
    if (!updatedRecord) {
      return res.status(404).json({
        error: "Growth record not found",
      });
    }
    // Send the updated record back to React with status 200
    res.status(200).json(updatedRecord);
  } catch (error) {
    //Handle errors
    console.error(error);

    // Send status 500 if the server fails to update the record
    res.status(500).json({
      error: "Fail to update growthRecords",
    });
  }
});

// DELETE GROWTH RECORD
app.delete(
  "/api/children/:childId/growthRecords/:recordId",
  async (req, res) => {
    try {
      const childId = Number(req.params.childId);
      const recordId = Number(req.params.recordId);

      // Delete the matching growth record from PostgreSQL
      const result = await pool.query(
        `DELETE FROM growth_records
         WHERE id = $1 AND child_id = $2
         RETURNING *`,
        [recordId, childId],
      );

      // Return 404 if no matching growth record was found
      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Record not found",
        });
      }
      // Send status 204 when the record is successfully deleted
      return res.sendStatus(204);
    } catch (error) {
      //Handle errors
      console.error(error);

      // Send status 500 if the server fails to delete the record
      return res.status(500).json({
        error: "failed to delete record",
      });
    }
  },
);

// ========================================
// SLEEP RECORDS REST API
// ========================================

// READ SLEEP RECORD
app.get("/api/children/:childId/sleepRecords", async (req, res) => {
  try {
    const childId = Number(req.params.childId);

    // Fetch sleep records for the selected child from PostgreSQL
    const result = await pool.query(
      `SELECT * FROM sleep_records WHERE child_id = $1`,
      [childId],
    );

    // Format the data for React
    const formattedSleepRecords = result.rows.map((record) => {
      return {
        id: record.id,
        childId: record.child_id,
        date: record.date,
        day: record.day,
        duration: Number(record.duration),
        note: record.note ?? "",
      };
    });
    // Send formatted data to react
    res.json(formattedSleepRecords);
  } catch (error) {
    console.error(error);

    // Send a 500 error response if fetching sleep records fails
    res.status(500).json({
      error: "Failed to fetch sleepRecords",
    });
  }
});

// CREATE SLEEP RECORD
app.post("/api/children/:childId/sleepRecords", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    const newRecord = req.body;

    if (!Number.isInteger(childId) || childId <= 0) {
      return res.status(400).json({
        error: "Invalid child ID",
      });
    }

    if (!newRecord.date || Number.isNaN(new Date(newRecord.date).getTime())) {
      return res.status(400).json({
        error: "Invalid date",
      });
    }

    if (
      newRecord.duration === "" ||
      newRecord.duration === null ||
      newRecord.duration === undefined ||
      !Number.isFinite(Number(newRecord.duration)) ||
      Number(newRecord.duration) <= 0
    ) {
      return res.status(400).json({
        error: "Invalid duration",
      });
    }

    const result = await pool.query(
      `INSERT INTO sleep_records
      (child_id, date, day, duration, note)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        childId,
        newRecord.date,
        newRecord.day,
        newRecord.duration,
        newRecord.note ?? "",
      ],
    );

    const record = result.rows[0];

    const savedRecord = {
      id: record.id,
      childId: record.child_id,
      date: record.date,
      day: record.day,
      duration: Number(record.duration),
      note: record.note ?? "",
    };

    res.status(201).json(savedRecord);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create sleep record",
    });
  }
});

// UPDATE SLEEP RECORD
app.put("/api/children/:childId/sleepRecords/:recordId", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    const recordId = Number(req.params.recordId);
    const newRecord = req.body;

    // Extract the fields from the request body
    const { date, day, duration, note } = newRecord;

    // Check if childId is a positive integer
    if (!Number.isInteger(childId) || childId <= 0) {
      return res.status(400).json({
        error: "Invalid child ID",
      });
    }

    // Check if recordId is a positive integer
    if (!Number.isInteger(recordId) || recordId <= 0) {
      return res.status(400).json({
        error: "Invalid record ID",
      });
    }

    // Check if the date exists and is valid
    if (!newRecord.date || Number.isNaN(new Date(newRecord.date).getTime())) {
      return res.status(400).json({
        error: "Invalid date",
      });
    }

    // Check if duration is a positive, finite number
    if (
      newRecord.duration === "" ||
      newRecord.duration === null ||
      newRecord.duration === undefined ||
      !Number.isFinite(Number(newRecord.duration)) ||
      Number(newRecord.duration) <= 0
    ) {
      return res.status(400).json({
        error: "Invalid duration",
      });
    }

    // Update sleep record in PostgreSQL
    const result = await pool.query(
      `UPDATE sleep_records
      SET
      date = $1,
      day = $2,
      duration = $3,
      note = $4
      WHERE id = $5 AND child_id = $6
      RETURNING *`,
      [date, day, duration, note ?? "", recordId, childId],
    );

    const record = result.rows[0];

    // Return 404 if no matching sleep record was found
    if (!record) {
      return res.status(404).json({
        error: "Sleep record not found",
      });
    }

    // Format PostgreSQL data for React
    // Convert snake_case to camelCase and duration to a number
    const updatedRecord = {
      id: record.id,
      childId: record.child_id,
      date: record.date,
      day: record.day,
      duration: Number(record.duration),
      note: record.note ?? "",
    };

    // Send the updated record back to React with status 200
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);

    // Return 500 if the update fails unexpectedly
    res.status(500).json({
      error: "Failed to update sleep record",
    });
  }
});

// DELETE SLEEP RECORD
app.delete(
  "/api/children/:childId/sleepRecords/:recordId",
  async (req, res) => {
    try {
      const childId = Number(req.params.childId);
      const recordId = Number(req.params.recordId);

      // Check if childId is a positive integer
      if (!Number.isInteger(childId) || childId <= 0) {
        return res.status(400).json({
          error: "Invalid child ID",
        });
      }

      // Check if recordId is a positive integer
      if (!Number.isInteger(recordId) || recordId <= 0) {
        return res.status(400).json({
          error: "Invalid record ID",
        });
      }

      // Delete the matching sleep record from PostgreSQL
      const result = await pool.query(
        `DELETE FROM sleep_records
      WHERE id = $1 AND child_id = $2
      RETURNING *`,
        [recordId, childId],
      );

      // Return 404 if no matching sleep record was found
      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Sleep record not found",
        });
      }
      // Return 204 if deletion succeeded
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);

      // Return 500 if the delete fails unexpectedly
      res.status(500).json({
        error: "Failed to delete sleep record",
      });
    }
  },
);
// ========================================
// FEEDING RECORDS REST API
// ========================================

// READ FEEDING RECORD
app.get("/api/children/:childId/feedingRecords", async (req, res) => {
  try {
    const childId = Number(req.params.childId);

    // Check if childId is a positive integer
    if (!Number.isInteger(childId) || childId <= 0) {
      return res.status(400).json({
        error: "Invalid child ID",
      });
    }

    // Fetch feeding records for the selected child from PostgreSQL
    const result = await pool.query(
      `SELECT * FROM feeding_records WHERE child_id = $1`,
      [childId],
    );

    // Format the data for React
    const formattedFeedingRecords = result.rows.map((record) => {
      return {
        id: record.id,
        childId: record.child_id,
        date: record.date,
        type: record.type,
        amount: Number(record.amount),
        duration: record.duration == null ? null : Number(record.duration),
        note: record.note ?? "",
      };
    });

    // Send formatted data to react
    res.json(formattedFeedingRecords);
  } catch (error) {
    console.error(error);

    // Send a 500 error response if fetching feeding records fails
    res.status(500).json({
      error: "Failed to fetch feeding records",
    });
  }
});

// CREATE FEEDING RECORD
app.post("/api/children/:childId/feedingRecords", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    const newRecord = req.body;

    // Validate child ID
    if (!Number.isInteger(childId) || childId <= 0) {
      return res.status(400).json({
        error: "Invalid child ID",
      });
    }

    // Validate date
    if (!newRecord?.date || Number.isNaN(new Date(newRecord.date).getTime())) {
      return res.status(400).json({
        error: "Invalid date",
      });
    }

    // Validate type
    if (!newRecord.type || typeof newRecord.type !== "string") {
      return res.status(400).json({
        error: "Invalid feeding type",
      });
    }

    // Validate amount
    if (
      newRecord.amount == null ||
      newRecord.amount === "" ||
      !Number.isFinite(newRecord.amount) ||
      newRecord.amount <= 0
    ) {
      return res.status(400).json({
        error: "Invalid amount",
      });
    }

    // Validate duration
    if (
      newRecord.duration != null &&
      (!Number.isInteger(newRecord.duration) || newRecord.duration <= 0)
    ) {
      return res.status(400).json({ error: "Invalid duration" });
    }

    // Validate note
    if (newRecord.note != null && typeof newRecord.note !== "string") {
      return res.status(400).json({
        error: "Invalid note",
      });
    }

    const childResult = await pool.query(
      "SELECT id FROM children WHERE id = $1",
      [childId],
    );

    // Check if child exists
    if (childResult.rows.length === 0) {
      return res.status(404).json({
        error: "Child not found",
      });
    }

    // Insert feeding record into PostgreSQL
    const result = await pool.query(
      `INSERT INTO feeding_records
       (child_id, date, type, amount, duration, note)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        childId,
        newRecord.date,
        newRecord.type,
        newRecord.amount,
        newRecord.duration ?? null,
        newRecord.note ?? "",
      ],
    );

    // Format data for React
    const record = result.rows[0];

    const createdRecord = {
      id: record.id,
      childId: record.child_id,
      date: record.date,
      type: record.type,
      amount: Number(record.amount),
      duration: record.duration == null ? null : Number(record.duration),
      note: record.note ?? "",
    };

    // Send created record
    return res.status(201).json(createdRecord);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to create feeding record",
    });
  }
});

// UPDATE FEEDING RECORD
app.put("/api/children/:childId/feedingRecords/:recordId", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    const recordId = Number(req.params.recordId);
    const updatedRecord = req.body;

    // Validate child ID
    if (!Number.isInteger(childId) || childId <= 0) {
      return res.status(400).json({
        error: "Invalid child ID",
      });
    }

    // Validate record ID
    if (!Number.isInteger(recordId) || recordId <= 0) {
      return res.status(400).json({
        error: "Invalid record ID",
      });
    }

    // Validate date
    if (
      !updatedRecord?.date ||
      Number.isNaN(new Date(updatedRecord.date).getTime())
    ) {
      return res.status(400).json({
        error: "Invalid date",
      });
    }

    // Validate type
    if (!updatedRecord.type || typeof updatedRecord.type !== "string") {
      return res.status(400).json({
        error: "Invalid feeding type",
      });
    }

    // Validate amount
    if (
      updatedRecord.amount == null ||
      updatedRecord.amount === "" ||
      !Number.isFinite(updatedRecord.amount) ||
      updatedRecord.amount <= 0
    ) {
      return res.status(400).json({
        error: "Invalid amount",
      });
    }

    // Validate duration
    if (
      updatedRecord.duration != null &&
      (!Number.isInteger(updatedRecord.duration) || updatedRecord.duration <= 0)
    ) {
      return res.status(400).json({
        error: "Invalid duration",
      });
    }

    // Validate note
    if (updatedRecord.note != null && typeof updatedRecord.note !== "string") {
      return res.status(400).json({
        error: "Invalid note",
      });
    }

    // Update feeding record in PostgreSQL
    const result = await pool.query(
      `UPDATE feeding_records
   SET date = $1,
       type = $2,
       amount = $3,
       duration = $4,
       note = $5
   WHERE id = $6 AND child_id = $7
   RETURNING *`,
      [
        updatedRecord.date,
        updatedRecord.type,
        updatedRecord.amount,
        updatedRecord.duration ?? null,
        updatedRecord.note ?? "",
        recordId,
        childId,
      ],
    );

    // Check if feeding record exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Feeding record not found",
      });
    }

    // Format data for React
    const record = result.rows[0];

    const formattedRecord = {
      id: record.id,
      childId: record.child_id,
      date: record.date,
      type: record.type,
      amount: Number(record.amount),
      duration: record.duration == null ? null : Number(record.duration),
      note: record.note ?? "",
    };

    // Send updated record
    return res.status(200).json(formattedRecord);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to update feeding record",
    });
  }
});

// DELETE FEEDING RECORD
app.delete(
  "/api/children/:childId/feedingRecords/:recordId",
  async (req, res) => {
    try {
      const childId = Number(req.params.childId);
      const recordId = Number(req.params.recordId);

      // Validate child ID
      if (!Number.isInteger(childId) || childId <= 0) {
        return res.status(400).json({
          error: "Invalid child ID",
        });
      }

      // Validate record ID
      if (!Number.isInteger(recordId) || recordId <= 0) {
        return res.status(400).json({
          error: "Invalid record ID",
        });
      }

      // Delete feeding record from PostgreSQL
      const result = await pool.query(
        `DELETE FROM feeding_records
         WHERE id = $1 AND child_id = $2
         RETURNING *`,
        [recordId, childId],
      );

      // Check if feeding record exists
      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Feeding record not found",
        });
      }

      // Successfully deleted
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Failed to delete feeding record",
      });
    }
  },
);
// ========================================
// START SERVER
// ========================================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

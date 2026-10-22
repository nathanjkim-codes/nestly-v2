import express from "express";
import cors from "cors";
import pool from "./db.js";

let children = [
  {
    id: 1,

    profile: {
      name: "Emma",
      age: "2 months",
      gender: "Girl",
      birthDate: "6-3-2023",
      profileImage: "...",
    },

    currentStats: {
      height: "22 in",
      weight: "26 lbs",
      sleep: "12hrs",
      feeding: "2 times",
      mood: "Needs attention",
    },

    insight: {
      title: "✨ AI Insight",
      message: "Emma is growing well!🌱",
      description: "Her sleep and nutrition patterns look balanced.",
    },

    growthRecords: [
      {
        id: 1,
        date: "2023-07-23T07:30:00",
        height: 22.5,
        weight: 11,
      },
      {
        id: 2,
        date: "2023-08-15T07:30:00",
        height: 25,
        weight: 15,
      },
      {
        id: 3,
        date: "2023-09-23T07:30:00",
        height: 29,
        weight: 20,
      },
      {
        id: 4,
        date: "2023-10-15T07:30:00",
        height: 30,
        weight: 21,
      },
      {
        id: 5,
        date: "2023-11-17T07:30:00",
        height: 31.5,
        weight: 21,
      },
      {
        id: 6,
        date: "2023-12-15T07:30:00",
        height: 31.5,
        weight: 20,
      },
      {
        id: 7,
        date: "2024-01-10T07:30:00",
        height: 32,
        weight: 21,
      },
      {
        id: 8,
        date: "2024-02-09T07:30:00",
        height: 32,
        weight: 21,
      },
      {
        id: 9,
        date: "2024-03-16T07:30:00",
        height: 32.25,
        weight: 22,
      },
      {
        id: 10,
        date: "2024-04-19T07:30:00",
        height: 32.5,
        weight: 22,
      },
      {
        id: 11,
        date: "2024-05-20T07:30:00",
        height: 32.5,
        weight: 21,
      },
      {
        id: 12,
        date: "2024-06-16T07:30:00",
        height: 33,
        weight: 21,
      },
      {
        id: 13,
        date: "2024-07-15T07:30:00",
        height: 33,
        weight: 22,
      },
      {
        id: 14,
        date: "2026-05-01T07:30:00",
        height: 33.5,
        weight: 22.5,
      },
      {
        id: 15,
        date: "2026-06-01T07:30:00",
        height: 34,
        weight: 23,
      },
      {
        id: 16,
        date: "2026-07-15T07:30:00",
        height: 34.5,
        weight: 23.5,
      },
      {
        id: 17,
        date: "2026-08-03T07:30:00",
        height: 35,
        weight: 24,
      },
      {
        id: 18,
        date: "2026-08-08T07:30:00",
        height: 35.25,
        weight: 24.5,
      },
    ],
    sleepRecords: [
      {
        id: 1,
        date: "2023-07-09T09:00:00",
        day: "Sun",
        duration: 10,
        note: "Skipped afternoon nap.",
      },
      {
        id: 2,
        date: "2023-07-10T09:00:00",
        day: "Mon",
        duration: 11,
        note: "Slept through the night.",
      },
      {
        id: 3,
        date: "2023-07-11T09:00:00",
        day: "Tue",
        duration: 9,
        note: "Slept through the night.",
      },
      {
        id: 4,
        date: "2023-07-12T09:00:00",
        day: "Wed",
        duration: 10,
        note: "Skipped afternoon nap.",
      },
      {
        id: 5,
        date: "2023-07-13T09:00:00",
        day: "Thu",
        duration: 11,
        note: "Slept through the night.",
      },
      {
        id: 6,
        date: "2023-07-14T09:00:00",
        day: "Fri",
        duration: 12,
        note: "Long afternoon nap.",
      },
      {
        id: 7,
        date: "2023-07-15T09:00:00",
        day: "Sat",
        duration: 10,
        note: "Fell asleep later than usual.",
      },
      {
        id: 8,
        date: "2023-07-23T09:00:00",
        day: "Sun",
        duration: 9.5,
        note: "Skipped afternoon nap.",
      },
      {
        id: 9,
        date: "2023-07-24T09:00:00",
        day: "Mon",
        duration: 10,
        note: "Restless sleep due to teething.",
      },
      {
        id: 10,
        date: "2023-07-25T09:00:00",
        day: "Tue",
        duration: 8.5,
        note: "Fell asleep later than usual.",
      },
      {
        id: 11,
        date: "2023-07-26T09:00:00",
        day: "Wed",
        duration: 9,
        note: "Long afternoon nap.",
      },
      {
        id: 12,
        date: "2023-07-27T09:00:00",
        day: "Thu",
        duration: 9.5,
        note: "Slept through the night.",
      },
      {
        id: 13,
        date: "2023-07-28T09:00:00",
        day: "Fri",
        duration: 8,
        note: "Woke up twice during the night.",
      },
      {
        id: 14,
        date: "2023-07-29T09:15:00",
        day: "Sat",
        duration: 9,
        note: "",
      },
      {
        id: 15,
        date: "2026-07-20T20:00:00",
        duration: 9.2,
      },
      {
        id: 16,
        date: "2026-08-03T20:00:00",
        duration: 9.5,
      },
      {
        id: 17,
        date: "2026-08-06T20:00:00",
        duration: 8.8,
      },
      {
        id: 18,
        date: "2026-08-09T20:00:00",
        duration: 9.7,
      },
    ],
    feedingRecords: [
      {
        id: 1,
        date: "2023-05-18T08:00:00",
        type: "Formula",
        amount: 5.0,
        unit: "oz",
        note: "Drank everything",
      },
      {
        id: 2,
        date: "2023-05-18T12:30:00",
        type: "Breastmilk",
        amount: 4.0,
        unit: "oz",
        note: "After nap",
      },
      {
        id: 3,
        date: "2023-05-18T05:45:00",
        type: "Formula",
        amount: 5.5,
        unit: "oz",
        note: "Morning feeding",
      },
      {
        id: 4,
        date: "2023-05-17T07:15:00",
        type: "Breastmilk",
        amount: 3.5,
        unit: "oz",
        note: "Left side",
      },
      {
        id: 5,
        date: "2023-05-17T11:45:00",
        type: "Formula",
        amount: 4.5,
        unit: "oz",
        note: "Good appetite",
      },
      {
        id: 6,
        date: "2023-05-17T03:00:00",
        type: "Formula",
        amount: 5.0,
        unit: "oz",
        note: "Night feeding",
      },
      {
        id: 7,
        date: "2023-05-16T08:30:00",
        type: "Breastmilk",
        amount: 4.0,
        unit: "oz",
        note: "Both sides",
      },
      {
        id: 8,
        date: "2023-05-16T01:15:00",
        type: "Formula",
        amount: 4.5,
        unit: "oz",
        note: "Before bedtime",
      },
      {
        id: 9,
        date: "2026-05-10T08:00:00",
        type: "Formula",
        amount: 4.2,
        unit: "oz",
        note: "",
      },
      {
        id: 10,
        date: "2026-06-15T08:00:00",
        type: "Breastmilk",
        amount: 4.5,
        unit: "oz",
        note: "",
      },
      {
        id: 11,
        date: "2026-07-20T08:00:00",
        type: "Formula",
        amount: 4.8,
        unit: "oz",
        note: "",
      },
      {
        id: 12,
        date: "2026-08-04T08:00:00",
        type: "Breastmilk",
        amount: 5.0,
        unit: "oz",
        note: "",
      },
      {
        id: 13,
        date: "2026-08-08T08:00:00",
        type: "Formula",
        amount: 5.3,
        unit: "oz",
        note: "",
      },
      {
        id: 14,
        date: "2026-07-30T08:00:00",
        type: "Formula",
        amount: 4,
        unit: "oz",
        note: "TEMP TEST",
      },
    ],
    vaccinations: [],
    milestones: [],
    reports: [],
  },

  {
    id: 2,

    profile: {
      name: "Evelyn",
      age: "6 months",
      gender: "Girl",
      birthDate: "3-23-2023",
      profileImage: "...",
    },

    currentStats: {
      height: "25.75 in",
      weight: "18 lbs",
      sleep: "14hrs",
      feeding: "4 times",
      mood: "Positive",
    },

    insight: {
      title: "✨ AI Insight",
      message: "Evelyn is growing well!🌱",
      description: "Her sleep and nutrition patterns look balanced.",
    },

    growthRecords: [
      {
        id: 1,
        date: "2023-04-15T07:30:00",
        height: 26,
        weight: 18,
      },

      {
        id: 2,
        date: "2023-05-10T07:30:00",
        height: 29,
        weight: 20,
      },
      {
        id: 3,
        date: "2023-06-07T07:30:00",
        height: 32,
        weight: 25,
      },
      {
        id: 14,
        date: "2026-05-05T07:30:00",
        height: 32.5,
        weight: 21.5,
      },
      {
        id: 15,
        date: "2026-06-15T07:30:00",
        height: 33,
        weight: 22,
      },
      {
        id: 16,
        date: "2026-07-20T07:30:00",
        height: 33.5,
        weight: 22.5,
      },
      {
        id: 17,
        date: "2026-08-05T07:30:00",
        height: 34,
        weight: 23,
      },
      {
        id: 18,
        date: "2026-08-09T07:30:00",
        height: 34.25,
        weight: 23.3,
      },
    ],

    sleepRecords: [
      {
        id: 1,
        date: "2023-04-15T09:00:00",
        day: "Sat",
        duration: 8.5,
        note: "Woke up twice during the night.",
      },
      {
        id: 2,
        date: "2023-04-16T09:00:00",
        day: "Sun",
        duration: 9,
        note: "Slept through the night.",
      },
      {
        id: 3,
        date: "2023-04-17T09:00:00",
        day: "Mon",
        duration: 10.5,
        note: "Long afternoon nap.",
      },
      {
        id: 4,
        date: "2023-04-18T09:00:00",
        day: "Tue",
        duration: 9.5,
        note: "Fell asleep later than usual.",
      },
      {
        id: 5,
        date: "2023-04-19T09:00:00",
        day: "Wed",
        duration: 9,
        note: "Restless sleep due to teething.",
      },
      {
        id: 6,
        date: "2023-04-20T09:00:00",
        day: "Thu",
        duration: 10,
        note: "Skipped afternoon nap.",
      },
      {
        id: 7,
        date: "2023-04-21T09:00:00",
        day: "Fri",
        duration: 8,
        note: "",
      },
      {
        id: 15,
        date: "2026-07-22T20:30:00",
        day: "Wednesday",
        duration: 8.9,
      },
      {
        id: 16,
        date: "2026-08-02T20:30:00",
        day: "Sunday",
        duration: 9.1,
      },
      {
        id: 17,
        date: "2026-08-06T20:30:00",
        day: "Thursday",
        duration: 9.4,
      },
      {
        id: 18,
        date: "2026-08-09T20:30:00",
        day: "Sunday",
        duration: 9.0,
      },
    ],
    feedingRecords: [
      {
        id: 1,
        date: "2023-04-20T12:45:00",
        type: "Bottle",
        amount: 4.5,
        unit: "oz",
        duration: 20,
        note: "Finished the bottle",
      },
      {
        id: 2,
        date: "2023-04-20T07:30:00",
        type: "Breastmilk",
        amount: 3.5,
        unit: "oz",
        duration: 18,
        note: "Left side",
      },
      {
        id: 3,
        date: "2023-04-19T20:15:00",
        type: "Formula",
        amount: 5,
        unit: "oz",
        duration: 25,
        note: "Before bedtime",
      },
      {
        id: 4,
        date: "2026-05-15T08:00:00",
        type: "Formula",
        amount: 3.8,
        unit: "oz",
        duration: 19,
        note: "",
      },
      {
        id: 5,
        date: "2026-06-20T08:00:00",
        type: "Breastmilk",
        amount: 4.1,
        unit: "oz",
        duration: 18,
        note: "",
      },
      {
        id: 6,
        date: "2026-07-22T08:00:00",
        type: "Formula",
        amount: 4.4,
        unit: "oz",
        duration: 20,
        note: "",
      },
      {
        id: 7,
        date: "2026-08-05T08:00:00",
        type: "Breastmilk",
        amount: 4.6,
        unit: "oz",
        duration: 18,
        note: "",
      },
      {
        id: 8,
        date: "2026-08-09T08:00:00",
        type: "Formula",
        amount: 4.9,
        unit: "oz",
        duration: 20,
        note: "",
      },
    ],
    vaccinations: [],
    milestones: [],
    reports: [],
  },
];

// SERVER SETUP
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

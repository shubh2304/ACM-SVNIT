/**
 * Seed script to create the first superadmin user
 * Run: node scripts/seed-admin.js
 * Or: npx ts-node scripts/seed-admin.ts
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@svnitacm.in";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "Admin@123";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const AdminUserSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  role: String,
}, { timestamps: true });

async function seed() {
  console.log("🔄 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

  const existing = await AdminUser.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`⚠️  Admin user already exists: ${ADMIN_EMAIL}`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await AdminUser.create({ email: ADMIN_EMAIL, passwordHash, role: "superadmin" });

  console.log(`✅ Superadmin created successfully!`);
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log(`   Login at: http://localhost:3000/admin/login`);

  await mongoose.disconnect();
}

seed().catch(console.error);

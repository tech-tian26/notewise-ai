import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {pool} from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name,email,password_hash)
       VALUES ($1,$2,$3)
       RETURNING id,name,email`,
      [name, email, hash]
    );

    return NextResponse.json({
      message: "User created",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}
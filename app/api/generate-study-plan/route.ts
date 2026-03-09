import { NextResponse } from "next/server"
import OpenAI from "openai"
import { pool } from "@/lib/db"

const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: {
    "api-version": process.env.AZURE_OPENAI_API_VERSION,
  },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY,
  },
})

    export async function POST() {
        try {

            const notesResult = await pool.query(`
            SELECT title, content
            FROM notes
            ORDER BY created_at DESC
            LIMIT 5
            `)

            const notesText = notesResult.rows
            .map((n) => `Title: ${n.title}\nContent: ${n.content}`)
            .join("\n\n")

            const quizResult = await pool.query(`
            SELECT title, score
            FROM quiz_attempts
            ORDER BY created_at DESC
            LIMIT 10
            `)

            const quizText = quizResult.rows
            .map((q) => `Topic: ${q.topic}, Score: ${q.score}%`)
            .join("\n")

            const weakTopics = quizResult.rows
            .filter((q) => q.score < 60)
            .map((q) => q.topic)
            .join(", ")

            const prompt = `
                You are an intelligent AI study planner.

                The student has uploaded the following notes:

                ${notesText || "No notes available"}

                Recent quiz performance:

                ${quizText || "No quiz data available"}

                Weak topics detected:

                ${weakTopics || "None"}

                Generate a personalized study plan for today.

                Return ONLY a JSON array in this format:

                [
                {
                "title": "Review Neural Networks",
                "description": "Revise key concepts",
                "type": "review",
                "duration": 20,
                "priority": "high",
                "scheduledFor": "${new Date().toISOString().split("T")[0]}",
                "completed": false
                }
                ]

                Rules:
                - Create 5 tasks
                - Prioritize weak topics
                - Base tasks on notes whenever possible
                - Mix review, quiz, revise, listen tasks
                - Duration between 10-30 minutes
                `

            const response = await openai.chat.completions.create({
            model: process.env.AZURE_OPENAI_DEPLOYMENT!,
            messages: [
                {
                role: "system",
                content: "You are an intelligent study planning assistant.",
                },
                {
                role: "user",
                content: prompt,
                },
            ],
            temperature: 0.7,
            })


            const content = response.choices[0].message.content
            const tasks = JSON.parse(content || "[]")

            for (const task of tasks) {
            await pool.query(
                `
                INSERT INTO study_tasks
                (title, description, type, duration, priority, scheduled_for, completed)
                VALUES ($1,$2,$3,$4,$5,$6,$7)
                `,
                [
                task.title,
                task.description,
                task.type,
                task.duration,
                task.priority,
                task.scheduledFor,
                false,
                ]
            )
            }

            return NextResponse.json({ tasks })

        } catch (error) {
            console.error(error)

            return NextResponse.json(
            { error: "Failed to generate study plan" },
            { status: 500 }
            )
        }
    }





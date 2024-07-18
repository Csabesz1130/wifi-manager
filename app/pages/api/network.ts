import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const networks = await prisma.network.findMany({
                select: { id: true, ssid: true },
            })
            res.status(200).json(networks)
        } catch (error) {
            console.error('Failed to fetch networks:', error)
            res.status(500).json({ error: 'Failed to fetch networks' })
        }
    } else if (req.method === 'POST') {
        try {
            const { ssid, password } = req.body
            const network = await prisma.network.create({
                data: { ssid, password },
            })
            res.status(201).json(network)
        } catch (error) {
            console.error('Failed to create network:', error)
            res.status(500).json({ error: 'Failed to create network' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

// File: pages/api/networks.ts
// Purpose: This file defines the API route for handling network operations.
//
// Functions:
// - handler:
//   Input: NextApiRequest, NextApiResponse
//   Purpose: Handles GET and POST requests for network operations.
//
//   GET: Retrieves all saved networks from the database.
//   POST: Creates a new network in the database.
//
// Notable elements:
// - Uses Prisma Client for database operations
// - Implements error handling and appropriate HTTP status codes
// - Restricts allowed HTTP methods to GET and POST
import { FastifyInstance } from 'fastify'
import { prisma } from '../db'

export default async function towsRoutes(fastify: FastifyInstance) {
    // Get all tows
    fastify.get('/', async () => {
        return prisma.tow.findMany({ orderBy: { id: 'desc' } })
    })

    // Create a new tow
    fastify.post('/', async (req) => {
        const { vehicle, pickup, dropoff } = req.body as any
        return prisma.tow.create({
            data: { vehicle, pickup, dropoff },
        })
    })

    // Update a tow
    fastify.put('/:id', async (req) => {
        const { id } = req.params as any
        const { status } = req.body as any

        if (!status) {
            throw new Error('Missing status field')
        }

        return prisma.tow.update({
            where: { id: Number(id) },
            data: { status },
        })
    })
}

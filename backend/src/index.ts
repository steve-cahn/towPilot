import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './db'
import towsRoutes from './routes/tows'

const server = Fastify({ logger: true })

await server.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})



server.register(towsRoutes, { prefix: '/api/tows' })

server.listen({ port: 4000 }, (err, address) => {
    if (err) throw err
    console.log(`🚀 Server ready at ${address}`)
})

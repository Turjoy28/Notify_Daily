const { create } = require('connect-mongo')
const Note = require('../models/Notes')
const mongoose = require('mongoose')

// Get Dashboard
exports.dashboard = async (req, res, next) => {
    let perPage = 12
    let page = parseInt(req.query.page) || 1

    const locals = {
        title: "Dashboard",
        description: "Free NodeJS Notes App.",
    }

    try {
        // Optional: insert demo note if needed
        await Note.insertMany([
            {
                user: "690b3a999a795a52f0d2bc8e",
                title: "NodeJs Tutorial",
                body: "Node.js is an open-source server environment.",
                createdAt: new Date("2025-11-05T11:52:57.788+00:00")
            }
        ])
    } catch (error) {
        console.error(error)
    }

    try {
        // Use await instead of callback
        const notes = await Note.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(req.user.id) }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    title: { $substr: ["$title", 0, 30] },
                    body: { $substr: ["$body", 0, 100] },
                    createdAt: 1
                }
            }
        ])
        .skip(perPage * (page - 1))
        .limit(perPage)
        
        const count = await Note.countDocuments({ user: req.user.id })

        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            layout: '../views/layouts/dashboard',
            notes,
            current: page,
            pages: Math.ceil(count / perPage)
        })
        
    } catch (error) {
        console.error(error)
        next(error)
    }
}

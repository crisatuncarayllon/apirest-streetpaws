const express = require('express');
const ownerSchema = require('../models/owner');
const userSchema = require('../models/user');
const serviceSchema = require('../models/service');
const mongoose = require('mongoose');

const router = express.Router();


router.post('/transaction', async (req, res) => {

    const transactionOptions = {
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' },
        readPreference: 'primary'
    };

    const session = await mongoose.startSession();
    try {
        const transactionResults = await session.withTransaction(async() => {
            const { id_dog, id_dogwalker, estado } = req.body;
            const servicio = serviceSchema( req.body );
            await servicio.save();

            const id_owner = await ownerSchema.findOne({
                'dogs': { $elemMatch: { _id: id_dog} }
            }, {
                "_id": 1
            },
                { session });

            await ownerSchema.updateOne(
                { _id: id_owner },
                { $set: { status: true } },
                { session });

            await userSchema.updateOne(
                { _id: id_dogwalker },
                { $set: { status: true } },
                { session });
        }, transactionOptions);

        if (transactionResults) {
            console.log("was successfully created");
        } else {
            console.log("was intentionally aborted");
        }

    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

});



module.exports = router;
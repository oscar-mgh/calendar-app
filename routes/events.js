/* 
    Events Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//* Every route needs to pass the JWT validation
router.use(validateJWT);

//* Get Event
router.get('/', getEvents);

//* Create Event
router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateFields
    ], 
createEvent);

//* Update Event
router.put('/:id', updateEvent);

//* Delete Event
router.delete('/:id', deleteEvent);

module.exports = router;

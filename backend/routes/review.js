const Router = require('express');
const reviewModel = require('../schema/reviewSchema');

const routes = new Router();

routes.get('/review/:id', async(req, res)=>{
    try {
        const data = await reviewModel.findById(req.params.id);
        res.status(200).json(data);

    } catch (error) {
        res.status(404).json({ message: 'Not found'});
    }
})


// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;

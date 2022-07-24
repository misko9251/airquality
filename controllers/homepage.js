module.exports = {
    getHomePage: async (request, response) => {
        response.render('index.ejs')
    }
}
const express = require("express")
const { getAllSurveysController, createSurveyController, getSpecificSurveyController, updateSurveyController, deleteSurveyController } = require("../controllers/surveyControllers")

const surveyRouter = express.Router()

surveyRouter.get('/', getAllSurveysController)
surveyRouter.get('/:id', getSpecificSurveyController)
surveyRouter.post('/create', createSurveyController)
surveyRouter.put('/update/:id', updateSurveyController)
surveyRouter.delete('/delete/:id',deleteSurveyController)

module.exports = {
    surveyRouter
}
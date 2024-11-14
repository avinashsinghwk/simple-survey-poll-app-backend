const { getAllSurveys, getSpecificSurvey, createSurvey, updateSurvey, deleteSurvey } = require("../models/surveyModels");


async function getAllSurveysController(req, res){
    try{
        const surveys = await getAllSurveys()
        if(surveys == null || surveys.length == 0){
            return res.status(200).json({message : 'No surveys found'})
        }
        res.status(200).json({surveys})
    } catch(e){
        res.status(411).json({})
    }
}

async function  getSpecificSurveyController(req, res) {
    try{
        const id = Number(req.params.id)
        const survey = await getSpecificSurvey(id)
        if(survey == null){
            return res.status(404).send({message : `No survey found with id ${id}`})
        }
        res.status(200).send({survey})
    } catch(e){
        res.status(500).json({})
    }
}

async function createSurveyController(req, res) {
    try{
        const body = req.body;
        const create = await createSurvey(body)
        res.status(201).send({message : 'Survey Created Successfully', survey : create})
    } catch(e){
        console.log(e)
        res.status(500).json({})
    }
}

async function updateSurveyController(req, res){
    try{
        const body = req.body;
        const surveyId = Number(req.params.id)
        const specificSurvey = await getSpecificSurvey(surveyId)
        if(specificSurvey == null){
            return res.status(404).send({message : `No survey found with id ${surveyId}`})
        }
        const update = await updateSurvey(body, surveyId, specificSurvey)
        res.status(201).send({message : 'Survey Updated Successfully', survey : update})
    } catch(e){
        console.log(e)
        res.status(500).send({})
    }
}


async function deleteSurveyController(req, res){
    try{
        const surveyId = Number(req.params.id)
        const isSurveyExist = await getSpecificSurvey(surveyId)
        if(isSurveyExist == null){
            return res.status(404).send({message : `No Survey found with id ${surveyId}`})
        }
        const response = await deleteSurvey(surveyId)
        res.status(200).send({message : 'Survey deleted Successfully', response})
    } catch(e){
        console.log(e)
        res.status(500).send({})
    }
}


module.exports = {
    getAllSurveysController,
    createSurveyController,
    getSpecificSurveyController,
    updateSurveyController,
    deleteSurveyController
}
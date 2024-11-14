const { PrismaClient } = require('@prisma/client')

async function getAllSurveys() {
    const prisma = new PrismaClient()
    return await prisma.survey.findMany({
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    })
}

async function getSpecificSurvey(id) {
    const prisma = new PrismaClient()
    return await prisma.survey.findFirst({
        where: {
            id
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    })
}

async function createSurvey(data) {
    const prisma = new PrismaClient()
    return await prisma.survey.create({
        data: {
            title: data.title,
            questions: {
                create: data.questions.map(q => ({
                    text: q.text,
                    options: {
                        create: q.options.map(o => ({
                            text: o.text
                        }))
                    }
                }))
            }
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    })
}

async function updateSurvey(data, id, oldData) {
    const prisma = new PrismaClient()
    return await prisma.survey.update({
        where: {
            id
        },
        data: {
            title: data.title,
            questions: {
                update: data.questions.map((q, i) => ({
                    where: {
                        id: oldData.questions[i].id
                    },
                    data: {
                        text: q.text,
                        options: {
                            update: q.options.map((o, j) => ({
                                where: {
                                    id: oldData.questions[i].options[j].id
                                },
                                data: {
                                    text: o.text
                                }
                            }))
                        }
                    }
                }))
            }
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    })
}

async function deleteSurvey(id) {
    const prisma = new PrismaClient()
    return await prisma.survey.delete({
        where: {
            id
        }
    })
}

module.exports = {
    getAllSurveys,
    createSurvey,
    getSpecificSurvey,
    updateSurvey,
    deleteSurvey
}
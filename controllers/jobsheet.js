const db = require("../models");
const Quiz = db.quizzes;


exports.submitOne = async (req, res) => {
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };

    try {
        var quiz = await Quiz.findOne({
            where: {
                id: req.body.quizId
            }
        });

        if (req.body.answer == quiz.key) {
            res.status(200).json({
                "message": `Jawabanmu adalah ${quiz.key} dan benar`
            })
        } else {
            res.status(200).json({
                "message": `jawaban benar adalah ${quiz.key}`
            })
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.submitMany = async (req, res) =>{
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };
    try{
        let benar = 0
        let salah = 0
        let totalSoal = jobsheet.quizId.lenght
        for (let i =0; i < totalSoal; i++)  {
            const quiz = await Quiz.findOne({
                limit: 1,
                where: {
                    id : jobsheet.quizId[i]
                },
                order: [['id', 'DESC']],
            });
            if(quiz.key == jobsheet.answer[i]){
                benar = benar + 1,
                salah = salah + 1
            }
        }
        res.status(200).json({
            message: `benar ${benar} dari ${totalSoal}, dan salah ${salah} dari ${totalSoal}`
        })
    }catch(e){
        res.status(500) ({
            message: e.message
        });

    }
};
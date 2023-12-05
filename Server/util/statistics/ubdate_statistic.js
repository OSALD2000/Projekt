
const ubdate_statistic = async (quiz, participant) => {

    const statistic = await quiz.getStatistic();

    statistic.last_participant = participant.getDataValue('_id');
    statistic.participants = statistic.getDataValue('participants') + 1;
    
    statistic.save();
}

module.exports = ubdate_statistic;

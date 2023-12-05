const update_average = (average, participant_scoure, participants_num) => {
    const new_average = Math.round(((parseFloat(average)+parseFloat(participant_scoure))/parseFloat(participants_num)) * 100.0) / 100.0;
    return new_average;
}

module.exports = update_average;
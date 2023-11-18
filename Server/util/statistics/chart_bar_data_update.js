const chart_doughnut_data_update = async (data, last_participant) => {
  const answers = await last_participant.getAnswers();

  for (let i = 0; i < data.questionsIds; i++) {
    const answer = answers.filter(
      (answer) => answer.getDataValue("questionId") === questionsIds[i],
    )[0];
    if (answer.getDataValue("is_right")) {
      data.data.datasets[0].data[i] += 1;
    } else {
      data.data.datasets[1].data[i] += 1;
    }
  }

  return data;
};

module.exports = chart_doughnut_data_update;

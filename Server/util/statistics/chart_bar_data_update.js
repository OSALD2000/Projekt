const chart_doughnut_data_update = async (data, last_participant) => {
  try {
    const data_obj = JSON.parse(data);

    const answers = await last_participant.getAnswers();

    console.log(data_obj);
    for (let i = 0; i < data_obj.questionIds.length; i++) {
      const answer = answers.filter(
        (answer) => answer.getDataValue("questionId") === data_obj.questionIds[i],
      )[0];
      if (answer.getDataValue("is_right")) {
        data_obj.data.datasets[0].data[i] += 1;
      } else {
        data_obj.data.datasets[1].data[i] += 1;
      }
    }

    return JSON.stringify(data_obj);

  } catch (err) {
    console.log(err); 
  }
};

module.exports = chart_doughnut_data_update;

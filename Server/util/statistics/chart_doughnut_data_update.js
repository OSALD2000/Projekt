const chart_doughnut_data_update = (data, new_result) => {
  const data_obj = JSON.parse(data);


  if (new_result <= 0.25) {
    (data_obj.datasets[0]).data[0] += 1;
  } else if (new_result <= 0.5) {
    (data_obj.datasets[0]).data[1] += 1;
  } else if (new_result <= 0.75) {
    (data_obj.datasets[0]).data[2] += 1;
  } else if (new_result <= 1) {
    (data_obj.datasets[0]).data[3] += 1;
  }
  return JSON.stringify(data_obj);
};

module.exports = chart_doughnut_data_update;

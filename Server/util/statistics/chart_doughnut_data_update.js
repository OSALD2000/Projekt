const chart_doughnut_data_update = (data, new_result) => {
  if (new_result <= 0.25) {
    data.datasets.data[0] += 1;
  } else if (new_result <= 0.5) {
    data.datasets.data[1] += 1;
  } else if (new_result <= 0.75) {
    data.datasets.data[2] += 1;
  } else if (new_result <= 1) {
    data.datasets.data[3] += 1;
  }
  return data;
};

module.exports = chart_doughnut_data_update;

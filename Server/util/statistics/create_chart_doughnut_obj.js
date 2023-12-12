const randomcolor = require("randomcolor");

const create_chart_doughnut_obj = () => {
  const borderColor = Array.from({ length: 4 }, (_, index) => randomcolor());
  const data = Array.from({ length: 4 }, (_, index) => 0);

  const doughnut_obj = {
    labels: ["0%-25%", "25%-50%", "50%-75%", "75%-100%"],
    datasets: [
      {
        label: "Anzahl Teilnehmer: ",
        data: data,
        backgroundColor: borderColor,
        hoverOffset: 0,
      },
    ],
  };

  return doughnut_obj;
};

module.exports = create_chart_doughnut_obj;

const Sequelize = require("sequelize");

const Participant = require("../quiz/participant");

const sequelize = require("../../util/db");
const chart_doughnut_data_update = require("../../util/statistics/chart_doughnut_data_update");
const chart_bar_data_update = require("../../util/statistics/chart_bar_data_update");

const statistics = sequelize.define(
  "statistics",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },

    participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    success_Participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    failed_Participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    average_scoure: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    chart_doughnut_data: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: JSON.stringify({
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
            hoverOffset: 0,
          },
        ],
      }),
    },

    chart_bar_data: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: JSON.stringify({
        questionsIds: [],
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
            {
              label: "",
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
        },
      }),
    },

    visibility: {
      type: Sequelize.ENUM("private", "public"),
      allowNull: false,
    },

    last_participant: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    // TODO: try catch überall "Fehlerhandlung"
    hooks: {
      afterUpdate: async (record) => {
        const last_participant = await Participant.findByPk(
          record.getDataValue("last_participant"),
        );

        if (last_participant.getDataValue("passed")) {
          record.increment("success_Participants", { by: 1 });
        } else {
          record.increment("failed_Participants", { by: 1 });
        }

        let chart_doughnut_data = record.getDataValue("chart_doughnut_data");
        chart_doughnut_data = chart_doughnut_data_update(
          chart_doughnut_data,
          last_participant.getDataValue("result"),
        );
        record.chart_doughnut_data = chart_doughnut_data;

        let chart_bar_data = record.getDataValue("chart_bar_data");
        chart_bar_data = await chart_bar_data_update(
          chart_bar_data,
          last_participant,
        );
        record.chart_bar_data = chart_bar_data;

        record.save();
      },
    },
  },
);

module.exports = statistics;

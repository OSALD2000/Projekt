const Sequelize = require("sequelize");

const Participant = require("../quiz/participant");

const sequelize = require("../../util/db");
const chart_doughnut_data_update = require("../../util/statistics/chart_doughnut_data_update");
const chart_bar_data_update = require("../../util/statistics/chart_bar_data_update");
const update_average = require("../../util/statistics/update_average");

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
    },

    chart_bar_data: {
      type: Sequelize.JSON,
      allowNull: false,
    },


    last_participant: {
      type: Sequelize.STRING,
      defaultValue: "keine Teilnehmer",
    },
  },
  {
    timestamps: false,
    // TODO: try catch überall "Fehlerhandlung"
    hooks: {
      afterSave: async (record) => {
        const last_participant = await Participant.findByPk(
          record.getDataValue("last_participant"),
        );
        if (last_participant) {
          if (last_participant.getDataValue("passed")) {
            record.increment("success_Participants", { by: 1 });
          } else {
            record.increment("failed_Participants", { by: 1 });
          }

          const new_average = update_average(record.getDataValue('average_scoure'),last_participant.getDataValue('result'), record.getDataValue('participants'));
          record.average_scoure = new_average;
          
          const chart_doughnut_data_loaded = record.getDataValue("chart_doughnut_data");

          const chart_doughnut_data_updated = chart_doughnut_data_update(
            chart_doughnut_data_loaded,
            last_participant.getDataValue("result"),
          );

          record.chart_doughnut_data = chart_doughnut_data_updated;

          const chart_bar_data_loaded  = record.getDataValue("chart_bar_data");
          const chart_bar_data_updated = await chart_bar_data_update(
            chart_bar_data_loaded,
            last_participant,
          );

          record.chart_bar_data = chart_bar_data_updated;
          record.last_participant = "Updated";
          
          record.save();
        }
      },
    },
  },
);

module.exports = statistics;

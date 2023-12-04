const randomcolor = require('randomcolor');

const create_chart_bar_obj = (question_num, questionIds) => {

    const borderColor = Array.from({ length: question_num }, (_, index) => randomcolor());
    const data = Array.from({ length: question_num }, (_, index) => 0);
    const labels = Array.from({ length: question_num }, (_, index) => `${index + 1}. question`);

    const bar_obj = {
        questionIds: questionIds,
        data: {
            labels: labels,
            datasets: [
                {
                    label: "richtig",
                    data: data,
                    backgroundColor: borderColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                },
                {
                    label: "falsch",
                    data: data,
                    backgroundColor: borderColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                },
            ],
        }
    };

    return bar_obj;
}

module.exports = create_chart_bar_obj;

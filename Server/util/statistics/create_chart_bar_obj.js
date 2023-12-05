const randomColor = require('randomcolor');

const create_chart_bar_obj = (question_num, questionIds) => {

    const borderColor_richtig = randomColor({hue: 'green', count: question_num});
    const borderColor_falsch = randomColor({hue: 'red', count: question_num})

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
                    backgroundColor: borderColor_richtig,
                    borderColor: borderColor_richtig,
                    borderWidth: 1,
                },
                {
                    label: "falsch",
                    data: data,
                    backgroundColor: borderColor_falsch,
                    borderColor: borderColor_falsch,
                    borderWidth: 1,
                },
            ],
        }
    };

    return bar_obj;
}

module.exports = create_chart_bar_obj;

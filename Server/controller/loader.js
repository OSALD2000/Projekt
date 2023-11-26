const QUIZCATEGORY = require("../module/enum/QUIZCATEGORY");

exports.loadCategory = (req, res, next) => {
    try {
        const list = [];
        for (const categoty in QUIZCATEGORY) {
            list.push(QUIZCATEGORY[categoty]);
        }

        res.status(200).json({
            categotys: list,
        })
    } catch(err) {
        console.log(err);
        next(err);
    }
} 
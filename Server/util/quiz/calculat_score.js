const calculat_score = (result, required_points) => {
  try {
    let summe = 0.0;
    let anzahl = 0.0;

    for (const r of result) {
      summe += r.weight * (r.is_right ? 1.0 : 0.0);
      anzahl += r.weight;
    }

    const score = Math.round((summe / anzahl) * 100.0) / 100.0;
    const bestanden = score < required_points ? false : true;


    return {
      score: score,
      bestanden: bestanden,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = calculat_score;

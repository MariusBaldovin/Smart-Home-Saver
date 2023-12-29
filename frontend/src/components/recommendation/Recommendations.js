const Recommendations = (selectedAnswers) => {
  let recommendations = [];

  if (selectedAnswers[1] === "NO") {
    recommendations.push(
      "Consider contacting your energy supplier to install a smart meter."
    );
  } else {
    recommendations.push(
      "Track your energy usage in the morning for the previous day."
    );
  }

  switch (selectedAnswers[2]) {
    case "GAS":
      recommendations.push(
        "A smart thermostat could help manage your gas heating efficiently."
      );
      break;
    case "ELECTRIC":
      recommendations.push(
        "Consider smart plugs and temperature sensors for electric heaters."
      );
      break;
    default:
      recommendations.push(
        "Explore installing efficient heating solutions like electric or gas boilers."
      );
      break;
  }

  if (selectedAnswers[3] === "REGULAR LIGHTS") {
    recommendations.push(
      "Switching to smart bulbs can significantly reduce your energy consumption."
    );
  } else {
    recommendations.push(
      "Color-changing smart bulbs offer versatility and energy efficiency."
    );
  }

  if (selectedAnswers[4] === "YES") {
    recommendations.push(
      "Programmable smart devices can optimize your consistent routines."
    );
  } else {
    recommendations.push(
      "Smart devices with learning capabilities are ideal for adapting to varied schedules."
    );
  }

  switch (selectedAnswers[5]) {
    case "DAILY":
      recommendations.push(
        "Running washing machines during off-peak hours can save energy."
      );
      break;
    case "SEVERAL_TIMES_A_WEEK":
      recommendations.push(
        "Consider energy-efficient washing machines for frequent use."
      );
      break;
    default:
      recommendations.push(
        "Using full loads and efficient models can improve washing machine energy usage."
      );
      break;
  }

  return recommendations;
};

export default Recommendations;

import React from "react";

// Utility function to calculate mean
const calculateMean = (values) => {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

// Utility function to calculate median
const calculateMedian = (values) => {
  const sortedValues = values.sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  } else {
    return sortedValues[middle];
  }
};

// Utility function to calculate mode
const calculateMode = (values) => {
  const frequencyMap = {};
  values.forEach((value) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
  });

  let mode;
  let maxFrequency = 0;

  for (const value in frequencyMap) {
    if (frequencyMap[value] > maxFrequency) {
      mode = parseFloat(value);
      maxFrequency = frequencyMap[value];
    }
  }

  return mode;
};

// Calculate Gamma for each point
const calculateGamma = (wine) =>
  (parseFloat(wine.Ash) * parseFloat(wine.Hue)) / parseFloat(wine.Magnesium);

// StatsTable component
const StatsTable = ({ data, property }) => {
  const classWiseData = {};

  // Organize data by class (Alcohol)
  data.forEach((item) => {
    const alcoholClass = item.Alcohol;
    const value =
      property === "Gamma" ? calculateGamma(item) : parseFloat(item[property]);

    if (!classWiseData[alcoholClass]) {
      classWiseData[alcoholClass] = [];
    }
    classWiseData[alcoholClass].push(value);
  });

  // Calculate mean, median, and mode for each class
  const measures = ["Mean", "Median", "Mode"];
  const tableHeader = (
    <tr>
      <th>Measure</th>
      {Object.keys(classWiseData).map((alcoholClass) => (
        <th key={alcoholClass}>Class {alcoholClass}</th>
      ))}
    </tr>
  );

  const statsTable = measures.map((measure) => (
    <tr key={measure}>
      <td>
        {property} {measure}
      </td>
      {Object.keys(classWiseData).map((alcoholClass) => {
        const propertyData = classWiseData[alcoholClass];
        let result;

        switch (measure) {
          case "Mean":
            result = calculateMean(propertyData).toFixed(2);
            break;
          case "Median":
            result = calculateMedian(propertyData).toFixed(2);
            break;
          case "Mode":
            result = calculateMode(propertyData).toFixed(2);
            break;
          default:
            result = "";
        }

        return <td key={alcoholClass}>{result}</td>;
      })}
    </tr>
  ));

  return (
    <table
      style={{
        borderCollapse: "collapse",
        margin: "5rem auto",
        width: "70%",
        textAlign: "center",
      }}
    >
      <thead style={{ borderBottom: "2px solid #ddd", background: "#f2f2f2" }}>
        {tableHeader}
      </thead>
      <tbody>{statsTable}</tbody>
    </table>
  );
};

export default StatsTable;

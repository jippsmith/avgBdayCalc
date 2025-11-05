const monthToNumber = {
  January: 0,
  February: 31,
  March: 60,
  April: 91,
  May: 121,
  June: 152,
  July: 182,
  August: 213,
  September: 244,
  October: 274,
  November: 305,
  December: 335
};

const debug = false;
const TOTAL_DAYS = 366;

function birthdayToNumber({ month, day }) {
  const monthNumber = monthToNumber?.[month];
  return monthNumber + day;
}

function numberToBirthday({ number }) {
  const monthsOptions = Object.keys(monthToNumber).reverse();
  const month = monthsOptions.find(key => monthToNumber[key] < number);
  const day = Math.round(number - monthToNumber[month]);
  return { month, day };
}

function findDistancesGivenBirthdayNumbers({ sortedBirthdayNumbers }) {
  const numberOfFriends = sortedBirthdayNumbers?.length;
  return sortedBirthdayNumbers?.map((val, i) => {
    if (i === numberOfFriends - 1) return sortedBirthdayNumbers?.[0] + TOTAL_DAYS - val;
    else return sortedBirthdayNumbers?.[i + 1] - val;
  });
}

function revalueBirthdaysBasedOnDistance({ firstDistances, secondDistances }) {
  firstDistances.pop();
  const reorderedDistances = [...secondDistances, ...firstDistances];
  return reorderedDistances?.reduce(
    (acc, next) => {
      const nextVal = next + acc[acc.length - 1];
      acc?.push(nextVal);
      return acc;
    },
    [0]
  );
}

function takeAverage({ birthdayNumbers }) {
  const numberOfBirthdays = birthdayNumbers.length;
  const addedAllUp = birthdayNumbers.reduce((acc, next) => acc + next, 0);
  return addedAllUp / numberOfBirthdays;
}

function convertAverageBackToNormal({ average, birthdayNumberOfLargestDistance }) {
  if (birthdayNumberOfLargestDistance === 0) return average;
  const Jan1 = TOTAL_DAYS - birthdayNumberOfLargestDistance;
  if (Jan1 < average) return average - Jan1;
  else if (average < Jan1) return TOTAL_DAYS - Jan1 + average;
  else return 1;
}

export default function calcluateAverage({ birthdays }) {
  const birthdayNumbers = birthdays.map(birthdayToNumber);
  const sortedBirthdayNumbers = birthdayNumbers?.sort((a, b) => (a < b ? -1 : 1));
  const distances = findDistancesGivenBirthdayNumbers({ sortedBirthdayNumbers });

  const indexOfLargestDistance = distances?.indexOf(Math.max(...distances)) + 1;
  const birthdayNumberOfLargestDistance = sortedBirthdayNumbers?.[indexOfLargestDistance] || sortedBirthdayNumbers?.[0];

  const firstDistances = distances?.slice(0, indexOfLargestDistance);
  const secondDistances = distances?.slice(indexOfLargestDistance);

  const reevaluatedBirthdays = revalueBirthdaysBasedOnDistance({ firstDistances, secondDistances });
  const average = takeAverage({ birthdayNumbers: reevaluatedBirthdays });
  const convertedAverage = convertAverageBackToNormal({ average, birthdayNumberOfLargestDistance });
  const averageBirthday = numberToBirthday({ number: convertedAverage });

  if (debug) {
    console.log({
      birthdayNumberOfLargestDistance,
      sortedBirthdayNumbers,
      distances,
      split: { firstDistances, secondDistances },
      reevaluatedBirthdays,
      average,
      convertedAverage,
      averageBirthday
    });
  }
  return averageBirthday;
}

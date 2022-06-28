const readAge = (bdate, ageArray, ageGroups) => {
  if (bdate) {
    const year = bdate.split(/\./g)[2];
    if (year) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - year;

      for (let i = 0; i < ageGroups.length; i++) {
        if (age <= ageGroups[i]) {
          ageArray[i + 1] += 1;
          break;
        }
      }

      return;
    }
  }
  ageArray[0] += 1; //Age unknown
};

const formatMemberData = (members, ageGroups) => {
  const memberSex = [0, 0, 0]; // Undefined, Female, Male
  const memberAge = [];
  const memberEducation = [0, 0, 0]; // Undefined, School, University

  memberAge.push(0); //Age unknown
  for (let i = 0; i < ageGroups.length; i++) {
    memberAge.push(0);
  }

  for (const m of members) {
    //read sex
    memberSex[m.sex] += 1;

    //read education
    if (m.university) {
      memberEducation[2] += 1;
    } else if (m.schools) {
      memberEducation[1] += 1;
    } else {
      memberEducation[0] += 1;
    }

    //read age
    readAge(m.bdate, memberAge, ageGroups);
  }

  return { memberSex, memberAge, memberEducation };
};

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

export { formatMemberData, hslToHex, months };

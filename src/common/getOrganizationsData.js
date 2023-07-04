module.exports = (users) => {
  const organizationsMap = new Map();

  // Iterate over each user
  for (const user of users) {
    const { organization, totalPoint, country, ...rest } = user;

    // Check if the organization exists in the map
    if (organizationsMap.has(organization)) {
      const orgData = organizationsMap.get(organization);

      // Update organization data
      orgData.number_of_points += totalPoint;
      orgData.active_users.push({ totalPoint, ...rest });
      orgData.number_of_users += 1;
      if (!orgData.countries.includes(country) && country !== "") {
        orgData.countries.push(country);
      }
    } else {
      // Create a new organization entry
      organizationsMap.set(organization, {
        name: organization,
        number_of_points: totalPoint,
        active_users: [{ totalPoint, ...rest }],
        number_of_users: 1,
        countries: country && country !== "" ? [country] : [],
      });
    }
  }

  // Convert map values to an array
  const organizationsArray = Array.from(organizationsMap.values());

  return organizationsArray;
};

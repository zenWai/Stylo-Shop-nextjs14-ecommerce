self.onmessage = function handleMessage(event) {
  const { cachedConvertVariantsToCombinations, searchParams, options } =
    event.data;

  if (!options || !Array.isArray(options)) {
    console.error('Options is undefined or not an array:', options);
    return; // Exit if options is not as expected
  }
  console.log(searchParams);
  // Convert searchParams to a more usable object format for easier comparison
  const paramsObj = searchParams.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  const availabilityResults = {};
  console.log(paramsObj);

  // Assuming options is an array of option objects with name and values properties
  options.forEach((option) => {
    option.values.forEach((value) => {
      // Simulate setting each option value
      const simulatedParams = {
        ...paramsObj,
        [option.name.toLowerCase()]: value,
      };

      // Check if there's at least one combination where this simulated selection is available
      const isAvailable = cachedConvertVariantsToCombinations.some(
        (combination) => {
          return Object.entries(simulatedParams).every(([key, val]) => {
            // Check if the combination matches the simulated selection
            return combination[key] === val && combination.availableForSale;
          });
        },
      );
      availabilityResults[`${option.name}:${value}`] = isAvailable;
    });
  });

  self.postMessage({ availabilityResults });
};

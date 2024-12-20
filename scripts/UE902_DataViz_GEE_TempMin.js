// Définir la région de la France
var france = ee.FeatureCollection('FAO/GAUL/2015/level0')
               .filter(ee.Filter.eq('ADM0_NAME', 'France'));

// Charger l'ensemble de données TerraClimate
var terraclimate = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                     .filterDate('2004-01-01', '2023-12-31')
                     .filterBounds(france);

// Créer une liste d'années et de mois
var years = ee.List.sequence(2004, 2023);
var months = ee.List.sequence(1, 12);

// Ajustement pour exporter uniquement Temp_Mean_C en Celsius
var tempMeanClimate = ee.ImageCollection(years.map(function(year) {
  return months.map(function(month) {
    var filtered = terraclimate.filter(ee.Filter.calendarRange(year, year, 'year'))
                               .filter(ee.Filter.calendarRange(month, month, 'month'));
    var count = filtered.size();
    return ee.Algorithms.If(count.gt(0),
      filtered.mean()
              .expression('0.5 * (tmmx + tmmn)', {
                'tmmx': filtered.select('tmmx').mean().multiply(0.1),
                'tmmn': filtered.select('tmmn').mean().multiply(0.1)
              })
              .rename('Temp_Mean_C')
              .set('year', year)
              .set('month', month)
              .set('system:time_start', ee.Date.fromYMD(year, month, 1))
              .clip(france),
      null);
  });
}).flatten());

// Visualiser sur la carte : exemple d'août 2003
var exampleMonth = tempMeanClimate.filter(ee.Filter.eq('year', 2023))
                                  .filter(ee.Filter.eq('month', 8)).first();

Map.centerObject(france, 5);

// Ajouter des couches à la carte
Map.addLayer(exampleMonth.select('Temp_Mean_C'), 
             {min: -5, max: 25, palette: ['blue', 'green', 'orange']}, 
             'Temp Moyenne Août 2003 (°C)');

// Exporter Temp_Mean_C vers Google Drive
years.getInfo().forEach(function(year) {
  months.getInfo().forEach(function(month) {
    var image = tempMeanClimate.filter(ee.Filter.eq('year', year))
                               .filter(ee.Filter.eq('month', month)).first();
    if (image) {
      Export.image.toDrive({
        image: image,
        description: 'Mean_Temp_France_' + year + '_' + month,
        folder: 'TerraClimate_Mean',
        fileNamePrefix: 'Mean_Temp_France_' + year + '_' + month,
        region: france.geometry(),
        scale: 4000,
        crs: 'EPSG:2154',
        maxPixels: 1e13
      });
    }
  });
});

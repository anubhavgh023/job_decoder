import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const countryCoordinates: {
  [key: string]: { latitude: number; longitude: number };
} = {
  AR: { latitude: -34.6037, longitude: -58.3816 }, // Argentina (Buenos Aires)
  AT: { latitude: 48.2100, longitude: 16.3634 },  // Austria (Vienna)
  CA: { latitude: 45.4215, longitude: -75.6903 }, // Canada (Ottawa)
  CH: { latitude: 46.9481, longitude: 7.4474 },   // Switzerland (Bern)
  CO: { latitude: 4.7110, longitude: -74.0721 },  // Colombia (Bogotá)
  ES: { latitude: 40.4168, longitude: -3.7038 },  // Spain (Madrid)
  FR: { latitude: 48.8566, longitude: 2.3522 },   // France (Paris)
  GB: { latitude: 51.5074, longitude: -0.1278 },  // United Kingdom (London)
  IL: { latitude: 31.7683, longitude: 35.2137 },  // Israel (Jerusalem)
  IN: { latitude: 28.6139, longitude: 77.2090 },  // India (New Delhi)
  IT: { latitude: 41.9028, longitude: 12.4964 },  // Italy (Rome)
  MX: { latitude: 19.4326, longitude: -99.1332 }, // Mexico (Mexico City)
  NG: { latitude: 9.0820, longitude: 8.6753 },    // Nigeria (Abuja)
  NL: { latitude: 52.3676, longitude: 4.9041 },   // Netherlands (Amsterdam)
  NO: { latitude: 59.9139, longitude: 10.7522 },  // Norway (Oslo)
  PE: { latitude: -12.0464, longitude: -77.0428 },// Peru (Lima)
  SG: { latitude: 1.3521, longitude: 103.8198 },  // Singapore (Singapore)
  UA: { latitude: 50.4501, longitude: 30.5234 },  // Ukraine (Kyiv)
  US: { latitude: 38.9072, longitude: -77.0369 }, // United States (Washington, D.C.)
};



type JobDensityData = {
  country: string | null;
  job_count: number;
};

export default function GeoMap() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const root = am5.Root.new(chartRef.current);

      root.setThemes([am5themes_Animated.new(root)]);

      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "translateY",
          projection: am5map.geoMercator(),
        })
      );

      const zoomControl = chart.set(
        "zoomControl",
        am5map.ZoomControl.new(root, {})
      );
      zoomControl.homeButton.set("visible", true);

      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"],
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        fill: am5.color(0x383838),
      });

      const pointSeries = chart.series.push(
        am5map.ClusteredPointSeries.new(root, {
          valueField: "value", // Ensure bullet value is linked to the data value
        })
      );

      pointSeries.bullets.push((root, _series, dataItem) => {
        const jobCount = dataItem.get("value") as number;
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: Math.cbrt(jobCount) * 4, // Dynamic radius based on job count
            tooltipY: 0,
            fill: am5.color(0xc1ff68),
            tooltipText: "{title}", // Bind title correctly to each point
            fillOpacity: 0.5, // Set transparency
            strokeWidth: 1, // Outline to make it more visible
            stroke: am5.color(0x88ccc0), // Color of the outline
          }),
        });
      });

      // Fetch data and populate the map
      fetchDataAndPopulateMap(pointSeries);

      return () => {
        root.dispose();
      };
    }
  }, []);

  return (
    <div
      id="chartdiv"
      ref={chartRef}
      style={{ width: "100%", height: "360px" }}
    ></div>
  );
}

// Function to fetch data and populate the map
async function fetchDataAndPopulateMap(
  pointSeries: am5map.ClusteredPointSeries
) {
  const response = await fetch("http://localhost:8000/dashboard");
  const data = (await response.json()) as { data: JobDensityData[] };

  data.data.forEach((item) => {
    if (item.country && countryCoordinates[item.country]) {
      const { latitude, longitude } = countryCoordinates[item.country];
      addCity(
        longitude,
        latitude,
        `${item.country}: ${item.job_count}`,
        item.job_count,
        pointSeries
      );
    }
  });
}

// Function to add cities to the map
function addCity(
  longitude: number,
  latitude: number,
  title: string,
  jobCount: number,
  pointSeries: am5map.ClusteredPointSeries
) {
  pointSeries.data.push({
    geometry: { type: "Point", coordinates: [longitude, latitude] },
    title: title,
    value: jobCount, // Make sure this is correctly linked to the value field
  });
}

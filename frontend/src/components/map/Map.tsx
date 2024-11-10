import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGDACSEvents,
  fetchEventGeometry,
} from "../../store/slices/gdacsSlice";
import type { AppDispatch, RootState } from "../../store/store";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MultiGeometryMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { events, geometries } = useSelector((state: RootState) => state.gdacs);
  useEffect(() => {
    console.log("events", events);
    console.log("geometries", geometries);
  }, [events, geometries]);
  // Color mapping based on severity
  const getAlertColor = (alertLevel: string) => {
    const colors = {
      Red: "#B71C1C", // Dark Red
      Orange: "#FFA726", // Orange
      Green: "#4CAF50", // Green
    };
    return colors[alertLevel] || "#808080";
  };

  const createGeoJSONData = () => {
    // First check if we have both events and geometries
    if (!events.length || !Object.keys(geometries).length) {
      return {
        type: "FeatureCollection",
        features: [],
      };
    }

    const features = events
      .map((event) => {
        // Create a unique key for each event
        const eventKey = Object.keys(geometries).find((key) =>
          key.includes(event.eventid.toString())
        );

        if (!eventKey || !geometries[eventKey]?.geometry) {
          return null;
        }

        // Extract coordinates from the geometry
        const geometry = geometries[eventKey].geometry;

        // Ensure the geometry is in the correct format
        const formattedGeometry = {
          type: geometry.type,
          coordinates:
            geometry.type === "Point"
              ? geometry.coordinates[0] // For Point, take first coordinate pair
              : geometry.coordinates, // For Polygon/MultiPolygon, use as is
        };
        const eventDetailsForPopup = {
          ...event,
          severitydata: JSON.stringify(event.severitydata),
        };
        return {
          type: "Feature",
          geometry: formattedGeometry,
          properties: {
            name: event.name,
            type: event.eventtype,
            severity: event.alertlevel,
            description: event.htmldescription?.replace(/<[^>]*>/g, "") || "",
            color: getAlertColor(event.alertlevel),
            eventDetails: JSON.stringify(eventDetailsForPopup),
          },
        };
      })
      .filter(Boolean); // Remove null values

    console.log("Processed Features:", features); // Debug log

    return {
      type: "FeatureCollection",
      features,
    };
  };

  useEffect(() => {
    dispatch(fetchGDACSEvents());
  }, [dispatch]);

  useEffect(() => {
    events.forEach((event) => {
      const eventKey = `${event.eventtype}_${event.eventid}_${event.episodeid}`;
      if (!geometries[eventKey]) {
        dispatch(fetchEventGeometry(event));
      }
    });
  }, [events, dispatch]);

  useEffect(() => {
    if (!mapRef.current || !events.length || !Object.keys(geometries).length)
      return;

    // Update the source data when events or geometries change
    const source = mapRef.current.getSource("geographic-data");
    if (source) {
      const geoJSONData = createGeoJSONData();
      console.log("Updating map with data:", geoJSONData); // Debug log
      source.setData(geoJSONData);
    }
  }, [events, geometries]);

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    }

    // Add check for mapContainerRef.current
    if (!mapboxgl.accessToken || !mapContainerRef.current || mapRef.current) {
      return;
    }

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [0, 0],
        zoom: 1,
      });

      mapRef.current.on("load", () => {
        // Add empty source initially
        mapRef.current.addSource("geographic-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        // Points Layer
        mapRef.current.addLayer({
          id: "point-layer",
          type: "circle",
          source: "geographic-data",
          filter: ["==", ["geometry-type"], "Point"],
          paint: {
            "circle-radius": 8,
            "circle-color": ["get", "color"],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // Add text labels for points
        mapRef.current.addLayer({
          id: "point-labels",
          type: "symbol",
          source: "geographic-data",
          filter: ["==", ["geometry-type"], "Point"],
          layout: {
            "text-field": ["get", "name"],
            "text-offset": [0, 1.5],
            "text-anchor": "top",
          },
          paint: {
            "text-color": "#000",
            "text-halo-color": "#fff",
            "text-halo-width": 1,
          },
        });

        // Polygon Layer
        mapRef.current.addLayer({
          id: "polygon-layer",
          type: "fill",
          source: "geographic-data",
          filter: ["==", ["geometry-type"], "Polygon"],
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.5,
          },
        });

        // Polygon Outline
        mapRef.current.addLayer({
          id: "polygon-outline",
          type: "line",
          source: "geographic-data",
          filter: ["==", ["geometry-type"], "Polygon"],
          paint: {
            "line-color": ["get", "color"],
            "line-width": 2,
          },
        });

        // MultiPolygon Layer
        mapRef.current.addLayer({
          id: "multipolygon-layer",
          type: "fill",
          source: "geographic-data",
          filter: ["==", ["geometry-type"], "MultiPolygon"],
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.5,
          },
        });

        // MultiPolygon Outline
        mapRef.current.addLayer({
          id: "multipolygon-outline",
          type: "line",
          source: "geographic-data",
          filter: ["==", ["geometry-type"], "MultiPolygon"],
          paint: {
            "line-color": ["get", "color"],
            "line-width": 2,
          },
        });

        // Add popups for all layers
        const layerIds = ["point-layer", "polygon-layer", "multipolygon-layer"];

        layerIds.forEach((layerId) => {
          mapRef.current.on("click", layerId, (e) => {
            if (!e.features[0].properties) return;

            const coordinates = e.lngLat;
            const properties = e.features[0].properties;

            // Parse the stringified eventDetails
            const eventDetails = JSON.parse(properties.eventDetails);
            const severityData = JSON.parse(eventDetails.severitydata);

            try {
              const popupContent = `
              <div class="feature-popup text-left p-2">
                <h1 class="font-bold text-xl dark:text-black">${properties.name}</h1>
                <p class="dark:text-black">Type: ${properties.type}</p>
                <p class="dark:text-black">Alert Level: <span class="px-2 py-1 rounded" style="background-color: ${properties.color}; color: white;">${properties.severity}</span></p>
                <p class="dark:text-black">From: ${new Date(eventDetails.fromdate).toLocaleDateString()}</p>
                <p class="dark:text-black">To: ${new Date(eventDetails.todate).toLocaleDateString()}</p>
                <p class="dark:text-black">Severity: ${severityData.severitytext}</p>
                <p class="dark:text-black">Country: ${eventDetails.country}</p>
                <p class="dark:text-black">Description: ${properties.description}</p>
              </div>
            `;

              // Update popup options for better styling
              if (!popupRef.current) {
                popupRef.current = new mapboxgl.Popup({
                  closeButton: true,
                  closeOnClick: false,
                  maxWidth: "300px",
                  className: "custom-popup",
                });
              }

              popupRef.current
                .setLngLat(coordinates)
                .setHTML(popupContent)
                .addTo(mapRef.current);
            } catch (error) {
              console.error("Error creating popup:", error);
              console.log("Properties:", properties);
              console.log("Event Details:", eventDetails);
            }
          });

          // Hover effects
          mapRef.current.on("mouseenter", layerId, () => {
            mapRef.current.getCanvas().style.cursor = "pointer";
          });

          mapRef.current.on("mouseleave", layerId, () => {
            mapRef.current.getCanvas().style.cursor = "";
          });
        });

        // Add navigation controls
        mapRef.current.addControl(new mapboxgl.NavigationControl());
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapContainerRef.current]);

  // Add a loading state indicator
  if (!events.length || !Object.keys(geometries).length) {
    return (
      <div className="w-full flex justify-between">
        <div className="w-[20%]">
          <h1>News</h1>
        </div>
        <div className="w-[80%] h-[500px] flex items-center justify-center">
          Loading map data...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between">
      <div className="w-[20%]">
        <h1>News</h1>
      </div>
      <div
        ref={mapContainerRef}
        className="w-[80%] h-[500px] relative rounded-lg"
        style={{
          position: "relative",
        }}
      />
    </div>
  );
};

export default MultiGeometryMap;

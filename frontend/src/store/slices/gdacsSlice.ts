import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface GDACSEvent {
  eventid: number;
  episodeid: number;
  eventtype: string;
  name: string;
  htmldescription: string;
  alertlevel: string;
  country: string;
  severitydata: {
    severity: number;
    severitytext: string;
    severityunit: string;
  };
  // Add other properties as needed
}

interface GDACSGeometry {
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface GDACSState {
  events: GDACSEvent[];
  geometries: Record<string, GDACSGeometry>;
  loading: boolean;
  error: string | null;
  selectedEvent: GDACSEvent | null;
}

const initialState: GDACSState = {
  events: [],
  geometries: {},
  loading: false,
  error: null,
  selectedEvent: null,
};

export const fetchGDACSEvents = createAsyncThunk(
  "gdacs/fetchEvents",
  async () => {
    const response = await fetch("http://127.0.0.1:8000/api/gdacs/events");
    console.log(response);
    return response.json();
  }
);

export const fetchEventGeometry = createAsyncThunk(
  "gdacs/fetchGeometry",
  async (event: GDACSEvent) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/gdacs/getgeometry?event_type=${event.eventtype}&event_id=${event.eventid}&episode_id=${event.episodeid}`
    );
    const data = await response.json();
    // console.log(data);
    return {
      eventKey: `${event.eventtype}_${event.eventid}_${event.episodeid}`,
      geometry: data,
    };
  }
);

const gdacsSlice = createSlice({
  name: "gdacs",
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGDACSEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGDACSEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchGDACSEvents.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch events";
        state.loading = false;
      })
      .addCase(fetchEventGeometry.fulfilled, (state, action) => {
        state.geometries[action.payload.eventKey] = action.payload.geometry;
      });
  },
});

export const { setSelectedEvent } = gdacsSlice.actions;
export default gdacsSlice.reducer;

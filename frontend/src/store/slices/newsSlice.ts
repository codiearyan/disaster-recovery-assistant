import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the type for a single news article
interface NewsArticle {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  disaster_type: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
}

// Define the type for the API response
interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Define the state type
interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  totalResults: 0
};

// Improved error handling in fetchNews
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/news/headlines');
     
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: NewsResponse = await response.json();
      console.log("API Response:", data);
      
      // Validate response data
      if (!data || !data.articles) {
        throw new Error('Invalid response format');
      }
      
      return data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch news'
      );
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // Add a reset action
    resetNews: (state) => {
      state.articles = [];
      state.loading = false;
      state.error = null;
      state.totalResults = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.articles = []; // Clear articles on error
      });
  },
});

// Export actions
export const { resetNews } = newsSlice.actions;

// Export selectors
export const selectNews = (state: { news: NewsState }) => state.news;

// Export reducer
export default newsSlice.reducer;
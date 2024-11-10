import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

// Initial state
const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  totalResults: 0
};

// Create async thunk for fetching news
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<NewsResponse>('http://127.0.0.1:8000/api/news/headlines');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch news');
    }
  }
);

// Create the slice
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
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
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
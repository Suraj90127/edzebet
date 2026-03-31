// propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { api } from "./api";
import axios from "axios";



// wingo  game
export const wingoPeriodList = createAsyncThunk(
  'game/wingo-period-list',
  async ({ typeid1, pageno, pageto }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/GetNoaverageEmerdList', { typeid: typeid1, pageno: pageno, pageto: pageto }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const wingoBet = createAsyncThunk(
  'game/wingo-bet',
  async ({ typeid1, selectBet, balance, multiplier }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/action/join', { typeid: typeid1, join: selectBet, x: multiplier, money: balance }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const wingoHistory = createAsyncThunk(
  'game/wingo-history',
  async ({ typeid1, pageno, pageto }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/GetMyEmerdList', { typeid: typeid1, pageno: pageno, pageto: pageto }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// k3  game
export const k3PeriodList = createAsyncThunk(
  'game/k3-period-list',
  async ({ typeid1, pageno, pageto }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/k3/GetNoaverageEmerdList', { gameJoin: typeid1, pageno: pageno, pageto: pageto }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const k3Bet = createAsyncThunk(
  'game/k3-bet',
  async ({ typeid1, selectTab, selectBet, totalbalance, multiplier }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/action/k3/join', { game: typeid1, listJoin: selectBet, gameJoin: selectTab, xvalue: multiplier, money: totalbalance }, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const k3History = createAsyncThunk(
  'game/k3-history',
  async ({ typeid1, pageno, pageto }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/k3/GetMyEmerdList', { gameJoin: typeid1, pageno: pageno, pageto: pageto }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 5d  game
export const d5PeriodList = createAsyncThunk(
  'game/5d-period-list',
  async ({ typeid1, pageno, pageto }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/5d/GetNoaverageEmerdList', { gameJoin: typeid1, pageno: pageno, pageto: pageto }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const d5Bet = createAsyncThunk(
  'game/d5-bet',
  async ({ typeid1, selectTab, selectBet, balance, multiplier }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/action/5d/join', { game: typeid1, list_join: selectBet, join: selectTab, x: multiplier, money: balance }, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const d5History = createAsyncThunk(
  'game/d5-history',
  async ({ typeid1, pageno, pageto }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/5d/GetMyEmerdList', { gameJoin: typeid1, pageno: pageno, pageto: pageto }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const jilliGame = createAsyncThunk(
  'game/jilli',
  async (gameId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/GetJilliboardGame/${gameId}`, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const jilliWallet = createAsyncThunk(
  'game/jilli-wallet',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/getboardGameInfo`, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const jilliWalletTransfer = createAsyncThunk(
  'game/jilli-wallet-transfer',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/transferMoneyToMainWallet`, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


export const gamelist_strip = createAsyncThunk(
  'game/gamelist_strip',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/gamelist_strip`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const gamelist_strip_start = createAsyncThunk(
  'game/gamelist_strip_start',
  async ({ prd_id, type }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/strip_start_add`, { prd_id: prd_id, type: type }, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const strip_balance = createAsyncThunk(
  'game/strip_balance',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/strip_balance`, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const addAmount_main_total = createAsyncThunk(
  'game/addAmount_main_total',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/addAmount_main_total`, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
// Spibe
export const spibeGame = createAsyncThunk(
  'game/spribe-game',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`https://allapi.codehello.site/api/games/provider`,
        { size: 10, provider: "SPB" },
        { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const openSpribeGame = createAsyncThunk(
  'game/spribe-open',
  async (gameId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/webapi/game/openGame`,
        { gameId: gameId },
        { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const SpribeGamemoneyTransfer = createAsyncThunk(
  'game/spribe-money-transfer',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/game/moneyTransfer`,
        { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)



export const gameReducer = createSlice({
  name: 'game',
  initialState: {
    loader: false,
    errorMessage: '',
    successMessage: '',
    wingoPeriodListData: null,
    wingoBetData: null,
    wingoHistoryData: null,
    k3PeriodListData: null,
    k3BetData: null,
    k3HistoryData: null,
    d5PeriodListData: null,
    d5BetData: null,
    d5HistoryData: null,
    // add userDetail to initialState
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
    game_reset: (state) => {
      state.wingoPeriodListData = null;
      state.k3PeriodListData = null;
      state.d5PeriodListData = null;
      // state.wingoBetData='';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(wingoPeriodList.pending, (state) => {
        state.loader = true;
      })
      .addCase(wingoPeriodList.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(wingoPeriodList.fulfilled, (state, { payload }) => {
        const wingoPeriodListData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.wingoPeriodListData = wingoPeriodListData;
      })
      .addCase(wingoBet.pending, (state) => {
        state.loader = true;
      })
      .addCase(wingoBet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(wingoBet.fulfilled, (state, { payload }) => {
        const wingoBetData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.wingoBetData = wingoBetData;
      })
      .addCase(wingoHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(wingoHistory.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(wingoHistory.fulfilled, (state, { payload }) => {
        const wingoHistoryData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.wingoHistoryData = wingoHistoryData;
      })
      // k3
      .addCase(k3PeriodList.pending, (state) => {
        state.loader = true;
      })
      .addCase(k3PeriodList.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(k3PeriodList.fulfilled, (state, { payload }) => {
        const k3PeriodListData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.k3PeriodListData = k3PeriodListData;
      })
      .addCase(k3Bet.pending, (state) => {
        state.loader = true;
      })
      .addCase(k3Bet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(k3Bet.fulfilled, (state, { payload }) => {
        const k3BetData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.k3BetData = k3BetData;
      })
      .addCase(k3History.pending, (state) => {
        state.loader = true;
      })
      .addCase(k3History.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(k3History.fulfilled, (state, { payload }) => {
        const k3HistoryData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.k3HistoryData = k3HistoryData;
      })
      // 5d
      .addCase(d5PeriodList.pending, (state) => {
        state.loader = true;
      })
      .addCase(d5PeriodList.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(d5PeriodList.fulfilled, (state, { payload }) => {
        const d5PeriodListData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.d5PeriodListData = d5PeriodListData;
      })
      .addCase(d5Bet.pending, (state) => {
        state.loader = true;
      })
      .addCase(d5Bet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(d5Bet.fulfilled, (state, { payload }) => {
        const d5BetData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.d5BetData = d5BetData;
      })
      .addCase(d5History.pending, (state) => {
        state.loader = true;
      })
      .addCase(d5History.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(d5History.fulfilled, (state, { payload }) => {
        const d5HistoryData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.d5HistoryData = d5HistoryData;
      })
      .addCase(jilliGame.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(jilliGame.fulfilled, (state, { payload }) => {
        const boardGameData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.boardGameData = boardGameData;
      })
      .addCase(jilliWallet.pending, (state) => {
        state.loader = true;
      })
      .addCase(jilliWallet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(jilliWallet.fulfilled, (state, { payload }) => {
        const jilliWalletData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.jilliWalletData = jilliWalletData;
      })
      .addCase(jilliWalletTransfer.pending, (state) => {
        state.loader = true;
      })
      .addCase(jilliWalletTransfer.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(jilliWalletTransfer.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(gamelist_strip.pending, (state) => {
        state.loader = true;
      })
      .addCase(gamelist_strip.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(gamelist_strip.fulfilled, (state, { payload }) => {
        const aviatorData = payload?.game_list ? payload.game_list[300] : null;

        state.successMessage = payload.message;
        state.loader = false;
        state.aviatorData = aviatorData
      })
      .addCase(gamelist_strip_start.pending, (state) => {
        state.loader = true;
      })
      .addCase(gamelist_strip_start.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(gamelist_strip_start.fulfilled, (state, { payload }) => {
        const aviatorDatas = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.aviatorData = aviatorDatas
      })

      .addCase(strip_balance.pending, (state) => {
        state.loader = true;
      })
      .addCase(strip_balance.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(strip_balance.fulfilled, (state, { payload }) => {
        const strip_balanceDatas = payload.balance;
        state.successMessage = payload.message;
        state.loader = false;
        state.strip_balanceDatas = strip_balanceDatas
      })

      .addCase(addAmount_main_total.pending, (state) => {
        state.loader = true;
      })
      .addCase(addAmount_main_total.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(addAmount_main_total.fulfilled, (state, { payload }) => {
        const strip_balanceDatass = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.strip_balanceDatass = strip_balanceDatass
      })

      .addCase(spibeGame.pending, (state) => {
        state.loader = true;
      })
      .addCase(spibeGame.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(spibeGame.fulfilled, (state, { payload }) => {
        const spibeGameData = payload.data.items;
        state.successMessage = payload.message;
        state.loader = false;
        state.spibeGameData = spibeGameData
      })

      .addCase(openSpribeGame.pending, (state) => {
        state.loader = true;
      })
      .addCase(openSpribeGame.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(openSpribeGame.fulfilled, (state, { payload }) => {
        state.spibeopenData = payload;
        state.successMessage = payload.message;
        state.loader = false;
      })

      .addCase(SpribeGamemoneyTransfer.pending, (state) => {
        state.loader = true;
      })
      .addCase(SpribeGamemoneyTransfer.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(SpribeGamemoneyTransfer.fulfilled, (state, { payload }) => {
        state.spibemoneyData = payload;
        state.successMessage = payload.message;
        state.loader = false;
      })

  }
});

export const { messageClear, game_reset } = gameReducer.actions;
export default gameReducer.reducer;

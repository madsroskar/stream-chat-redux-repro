import {combineReducers} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { StreamChat } from 'stream-chat';
import Config from 'react-native-config';

interface Result {
  channelId: string;
  duration: string;

}

const client = StreamChat.getInstance(Config.STREAM_API_KEY);

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: client.baseURL }),
  endpoints: build => ({
    toggleChat: build.mutation<Result, { image: string; freeze: boolean; channelId: string; }>({
      query: (data) => ({
        url: `/chat/${data.channelId}/toggle`,
        body: {
          freeze: data.freeze,
          image: data.image,
        },
        method: 'PUT',
      }),
    }),
  }),
});

export const { useToggleChatMutation } = chatApi;

export default combineReducers({
  [chatApi.reducerPath]: chatApi.reducer,
});

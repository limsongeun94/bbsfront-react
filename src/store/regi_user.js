import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  name: "",
  nick: "",
  phone: "",
  zipcode: "",
  address: "",
  address_detail: "",
  terms: [],
};

let regi_user = createSlice({
  name: "regi_user",
  initialState,
  reducers: {
    createEmail(state, action) {
      state.email = action.payload;
    },
    createNick(state, action) {
      state.nick = action.payload;
    },
    createPWord(state, action) {
      state.password = action.payload;
    },
    createName(state, action) {
      state.name = action.payload;
    },
    createPhone(state, action) {
      state.phone = action.payload;
    },
    createZipcode(state, action) {
      state.zipcode = action.payload;
    },
    createAdr(state, action) {
      state.address = action.payload;
    },
    createDeAdr(state, action) {
      state.address_detail = action.payload;
    },
    createTerm(state, action) {
      // 배열의 원소가 숫자, 문자열 같은 원시타입일 때 사용할 수 있는 중복 제거법
      // Set 은 중복없는 배열 같은거라고 생각하면 돼응
      state.terms.push(action.payload);
      state.terms = Array.from(new Set(state.terms));
    },
    removeInfo(state) {
      state.email = "";
      state.password = "";
      state.name = "";
      state.nick = "";
      state.phone = "";
      state.zipcode = "";
      state.address = "";
      state.address_detail = "";
    },
  },
});

export let {
  createEmail,
  createNick,
  createPWord,
  createName,
  createPhone,
  createZipcode,
  createAdr,
  createDeAdr,
  createTerm,
  removeInfo,
} = regi_user.actions;

export default regi_user.reducer;

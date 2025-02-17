// import axios from "axios";

// export const registerUser = async (data: { name: string; email: string; password: string }) => {
//   return axios.post("/api/register", data);
// };

// export const verifyOTP = async (data: { email: string; otp: string }) => {
//   return axios.post("/api/verify-otp", data);
// };

// export const resendOTP = async (email: string) => {
//   return axios.post("/api/resend-otp", { email });
// };


import axios from "axios";

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  return axios.post("/api/register", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const verifyOTP = async (data: { email: string; otp: string }) => {
  return axios.post("/api/verify-otp", data, {
    headers: { "Content-Type": "application/json" },
  });
};

// ✅ إضافة `resendOTP` للتأكد من تصديره بشكل صحيح
export const resendOTP = async (email: string) => {
  return axios.post("/api/resend-otp", { email }, {
    headers: { "Content-Type": "application/json" },
  });
};



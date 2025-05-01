export const baseURL = import.meta.env.VITE_BACKEND_URL;

export const SummaryAPI = {
  creditUser: {
    url: "/api/user/credits",
    method: "GET",
  },
  removeImageBg: {
    url: "/api/image/remove-bg",
    method: "POST",
  },
  razorpay_payment: {
    url: "/api/user/pay-razor",
    method: "POST",
  },
  // verifyrzPay: {
  //   url: "/api/user/verify-rzpay",
  //   method: "POST",
  // },
};

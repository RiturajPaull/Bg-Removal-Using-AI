export const baseURL = "http://localhost:5000";

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

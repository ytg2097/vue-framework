const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  accountId: state => state.user.accountId,
  userName: state => state.user.userName,
  loginName: state => state.user.loginName
};
export default getters

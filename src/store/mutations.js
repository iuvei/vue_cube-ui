

export const saveUserName = (state,name) => {
    window.sessionStorage.setItem('userName',name);
    state.userName = name;
}
export const saveUserMoney = (state,money) => {
    window.sessionStorage.setItem('userMoney',money);
    state.userMoney = money;
}


const actions = {
    saveUserMoney({commit},money){
        try{
            console.log(123)
            commit('saveUserMoney',money);
        }catch(err){
            console.log(err)
        }
    },
    saveUserName({commit},name){
        try{
            commit('saveUserName',name);
        }catch(err){
            console.log(err)
        }
    },
}

export default actions
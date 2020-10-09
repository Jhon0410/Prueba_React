const login = function(idUsuario, isAdmin){
    localStorage.setItem('usuario', idUsuario);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('isLogin', 'true');
}

const logout = function(){
    localStorage.removeItem('usuario');
    localStorage.setItem('isLogin', 'false');
    localStorage.setItem('isAdmin', 'false');
}

const isLogin = function(){
    let isLogin = localStorage.getItem('isLogin');
    if(isLogin){
        if (isLogin === 'true'){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }

}

const isAdministrador = function(){
    let isLogin = localStorage.getItem('isAdmin');
    if(isLogin){
        if (isLogin === 'true'){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }

}

const usuarioEnSession = function(){
    return localStorage.getItem('usuario');
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.isLogin = isLogin;
module.exports.usuarioEnSession = usuarioEnSession;
module.exports.isAdministrador = isAdministrador;

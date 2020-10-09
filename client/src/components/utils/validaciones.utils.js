const validacionEmail = (fieldName, email) => {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email,
        )
    ) {
        return null;
    }
    if (email.trim() === '') {
        return `${fieldName} es requerido`;
    }
    return `Ingrese una dirección de correo valida en ${fieldName}`;
};

const validacionSoloLetras = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
        return `${fieldName} es requerido`;
    }
    if (/[^a-zA-Z-0-9 -]/.test(fieldValue)) {
        return `${fieldName} solo permite numeros o letras`;
    }
    return null;
};


const validacionSoloNumeros = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
        return `${fieldName} es requerido`;
    }
    if (/[0-9]/.test(fieldValue)) {
        return `${fieldName} solo permite numeros`;
    }
    return null;
};

const validacionLogitudMinima = (fieldName, fieldValue, minLength) => {
    if (fieldValue.trim() === '') {
        return `${fieldName} es requerido`;
    }
    if (fieldValue.trim().length < minLength) {
      return `${fieldName} debe tener minimo ${minLength} caracteres`;
    }
    return null;
  };

 const hasError = (form) => {
    var isValid = false;
    for(var prop in form){
        console.log(prop);
        if(form.hasOwnProperty(prop)){
            isValid = true;
        }
    }
    return isValid
 } 

module.exports.validacionEmail = validacionEmail;
module.exports.validacionSoloLetras = validacionSoloLetras;
module.exports.validacionSoloNumeros =validacionSoloNumeros;
module.exports.validacionLogitudMinima =validacionLogitudMinima;
module.exports.hasError = hasError;
import { IRegisterError, IValidateRegister } from "@/types";

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/



const validateRegister = (value: IValidateRegister):IRegisterError => {
    let errors : IRegisterError = {}

    if (!value.email){errors.email = "email is required"}
    else if (emailRegex.test(value.email)){errors.email = "email is not valid"}
    else if (!value.password){errors.password = "password is required"}
    else if (passwordRegex.test(value.password))
        {errors.password = "Minimum eight characters, at least one letter, one number and one special character"}
    else if (!value.name){errors.name = "name is required"}
    else if (!nameRegex.test(value.name)){errors.name = "name is not valid"}    
    else if (!value.address){errors.address = "address is required"}
    else if (!value.phone){errors.phone = "phone is required"}

    return errors
}
export default validateRegister
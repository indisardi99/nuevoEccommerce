import { IValidateError, IValidateLogin } from "@/types";

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validateLogin = (value: IValidateLogin):IValidateError => {
    let errors : IValidateError = {}

    if (!value.email){errors.email = "email is required"}
    else if (emailRegex.test(value.email)){errors.email = "email is not valid"}
    else if (!value.password){errors.password = "password is required"}
    else  (passwordRegex.test(value.password))
        {errors.password = "Minimum eight characters, at least one letter, one number and one special character"}

    return errors
}
export default validateLogin
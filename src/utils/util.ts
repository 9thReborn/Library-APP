import Joi from 'joi'


export const validateUser = Joi.object().keys({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirm_password: Joi.any().equal(Joi.ref('password'))
    .label('confirm password').messages({'any.only': '{{#label}} does not mean'})
})




export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: ''
    }
  }
}

//SQL INJECTION =>>> something to avoid 

let name = "0"
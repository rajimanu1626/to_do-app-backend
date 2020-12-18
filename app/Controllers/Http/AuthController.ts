import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/Users'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
/*
****************************Register**********************************
*/
    public async register ({ request }: HttpContextContract) {
        /**
         * Validate user details
         */
        const validationSchema = schema.create({
          username: schema.string({ trim: true }, [
            rules.unique({ table: 'users', column: 'username' }),
          ]),
          password: schema.string({ trim: true }, [
            rules.confirmed(),
          ]),
        })
    
        const userDetails = await request.validate({
          schema: validationSchema,
        })
    
        /**
         * Create a new user
         */
        const user = new Users()
        user.username = userDetails.username
        user.password = userDetails.password
        await user.save()
    
        return 'Your account has been created'
      }
    
/*
******************************Login************************************
*/

  public async login ({ request, auth }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')

    const token = await auth.use('api').attempt(username, password,{expiresIn:'2 days'})
    return token.toJSON()
  }

  public async logout({request,auth}:HttpContextContract){
    await auth.use('api').logout()
  }

}

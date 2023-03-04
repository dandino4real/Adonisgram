import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {
  public async index() {
    return await User.all();
  }
  public async signup({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.confirmed()]),
      }),
      messages: {
        "name.required": "Name is required to signup",
        "email.required": "Email is required to signup",
        "password.required": "Password is required to signup",
      },
    });

    // const user = new User()
    // user.name = payload.name
    // user.email = payload.email
    // user.password = payload.password
    // await user.save()

    await User.create(payload);

    return response.redirect("/");
  }

  public async signin({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(4)]),
      }),
      messages: {
        "email.required": "Enter your email",
        "password.required": "Enter your password",
        "password.minLength": "password must be atleast 4 characters",
      },
    });

    // try {
    // const email = payload.email
    // const password = payload.password
    //   await auth.use('web').attempt(email, password)
    // return response.redirect('/dashboard')

    // } catch (error) {

    // }

    const email = payload.email;
    const password = payload.password;

    const res = await auth.use("web").attempt(email, password);

    //  console.log(res);
    const userEmail = auth.user?.email;
    console.log(userEmail);

    return response.redirect("/dashboard");
  }
  public async signout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect("/");
  }
}

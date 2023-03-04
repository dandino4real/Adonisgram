import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";

import Post from "App/Models/Post";

export default class PostsController {
  public async index() {
    return Post.all();
  }
  public async show({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        title: schema.string(),
        body: schema.string(),
      }),
    });

    const post = await Post.create(payload);

    return response.created({
      message: "post created succesfuly",
      data: post,
    });
  }
}

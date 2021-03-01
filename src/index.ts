// required for type-graphql
import "reflect-metadata";
// MIKRO-ORM SETUP
import { MikroORM } from "@mikro-orm/core";
import { __prod__, __psql__, __port__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

// EXPRESS & APOLLO SETUP
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  // config
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    // allow what to be access in the resolver, able to pass (req, res) from express
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(__port__, () => {
    console.log(`Server is running at port ${__port__}`);
  });
};

main().catch(err => console.error(err));

// notes
// const post = orm.em.create(Post, { title: "my first post" });
// await orm.em.persistAndFlush(post);
// const posts = await orm.em.find(Post, {});

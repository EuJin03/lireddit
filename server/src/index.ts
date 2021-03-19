// required for type-graphql
import "reflect-metadata";
// MIKRO-ORM SETUP
import { MikroORM } from "@mikro-orm/core";
import { __prod__, __psql__, __port__, __priv__, __cook__ } from "./constants";
import microConfig from "./mikro-orm.config";

// EXPRESS & APOLLO SETUP
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import cors from "cors";

// REDIS SETUP
// import redis from "redis";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
// import { sendEmail } from "./utils/sendEmail";
// import { User } from "./entities/User";

const main = async () => {
  // config
  const orm = await MikroORM.init(microConfig);

  await orm.getMigrator().up();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: __cook__,
      store: new RedisStore({
        client: redis,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true, // frontend js unable to access
        secure: __prod__, // cookie only works in https
        sameSite: "lax", // csrf
      },
      secret: `${__priv__}`,
      resave: false,
      saveUninitialized: false, // if true, provide empty session id
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    // allow what to be access in the resolver, able to pass (req, res) from express
    context: ({ req, res }) => ({ em: orm.em, req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(__port__, () => {
    console.log(`Server is running at port ${__port__}`);
  });
};

main().catch(err => console.error(err));

// notes
// const post = orm.em.create(Post, { title: "my first post" });
// await orm.em.persistAndFlush(post);
// const posts = await orm.em.find(Post, {});
// await orm.em.nativeDelete(User, {});

import { RenderError } from "@quasar/app-vite";
import { ssrMiddleware } from "quasar/wrappers";
import userRouter from "../mock/user";
import employeeRouter from "../mock/employee";

export default ssrMiddleware(({ app, resolve, render, serve }) => {
  if (process.env.DEV) {
    app.use(userRouter, employeeRouter);
  }

  app.get(resolve.urlPath("*"), (req, res) => {
    res.setHeader("Content-Type", "text/html");

    render({ req, res })
      .then((html) => {
        res.send(html);
      })
      .catch((err: RenderError) => {
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url);
          } else {
            res.redirect(err.url);
          }
        } else if (err.code === 404) {
          res.status(404).send("404 | Page Not Found");
        } else if (process.env.DEV) {
          serve.error({ err, req, res });
        } else {
          res.status(500).send("500 | Internal Server Error");
        }
      });
  });
});

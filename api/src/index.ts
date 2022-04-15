import { Router } from "itty-router";
import { resizeImage } from "./resize-image";

const router = Router();

router.get("/resize-image", resizeImage);

export default {
  async fetch(request: Request): Promise<Response> {
    return router.handle(request);
  },
};

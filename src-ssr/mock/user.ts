import { Router } from "express";
import repository from "./repository";
import { User } from "./entity/User";
import { ILike } from "typeorm";

const userRouter = Router();

const userRepository = repository.getRepository(User);

userRouter.get("/api/users", async (req, res) => {
  try {
    const { page, perpage } = req.query || {};

    //@ts-ignore
    let _page = +page,
      //@ts-ignoreу
      _perpage = +perpage;

    if (isNaN(_page) || _page < 0) {
      _page = 0;
    }
    if (isNaN(_perpage) || _perpage < 1) {
      _perpage = 5;
    }

    if (_perpage > 25) {
      _perpage = 25;
    }

    const [data, total] = await userRepository.findAndCount({
      skip: _perpage * (_page - 1),
      take: _perpage,
      order: {
        name: "ASC",
      },
    });

    res.json({
      total,
      data,
    });
  } catch (error) {
    res.status(400).json();
  }
});

userRouter.get("/api/users/search", async (req, res) => {
  try {
    const { query } = req.query;
    const [data, total] = await userRepository.findAndCount({
      where: {
        name: ILike(`%${query || ""}%`),
      },
      order: {
        name: "ASC",
      },
      take: 25,
    });
    res.json({
      total,
      data,
    });
  } catch (error) {
    res.status(404).json();
  }
});

userRouter.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOneOrFail({
      where: {
        id: +id,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(404).json();
  }
});

userRouter.post("/api/users", async (req, res) => {
  try {
    const user = await userRepository.save(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json();
  }
});

userRouter.patch("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userRepository.update(id, req.body);
    res.json();
  } catch (error) {
    res.status(400).json();
  }
});

userRouter.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userRepository.delete(id);
    res.json();
  } catch (error) {
    res.status(400).json();
  }
});

export default userRouter;

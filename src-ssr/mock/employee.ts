import { Router } from "express";
import repository from "./repository";
import { User } from "./entity/User";
import { ILike } from "typeorm";
import { Employee } from "./entity/Employee";

const employeeRouter = Router();

const employeeRepository = repository.getRepository(Employee);

employeeRouter.get("/api/employes", async (req, res) => {
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

    const [data, total] = await employeeRepository.findAndCount({
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

employeeRouter.get("/api/employes/search", async (req, res) => {
  try {
    const { query } = req.query;
    const [data, total] = await employeeRepository.findAndCount({
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

employeeRouter.get("/api/employes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await employeeRepository.findOneOrFail({
      where: {
        id: +id,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(404).json();
  }
});

employeeRouter.post("/api/employes", async (req, res) => {
  try {
    const user = await employeeRepository.save(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

employeeRouter.patch("/api/employes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await employeeRepository.update(id, req.body);
    res.json();
  } catch (error) {
    res.status(400).json();
  }
});

employeeRouter.delete("/api/employes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await employeeRepository.delete(id);
    res.json();
  } catch (error) {
    res.status(400).json();
  }
});

export default employeeRouter;

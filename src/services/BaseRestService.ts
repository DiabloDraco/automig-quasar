import { api } from "src/boot/axios";
import { PageModel } from "src/models/PageModel";

type ID = { id: number | string };
type AsyncMany<T> = Promise<PageModel<T>>;
type AsyncOne<T> = Promise<T>;

export abstract class BaseRestService<T extends ID> {
  constructor(private readonly url: string) {}

  async page(query: string): AsyncMany<T> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const { data } = await api.get<PageModel<T>>(`${this.url}?${query}`);
        resolve(data);
      }, 200);
    });
  }

  async search(query: string = ""): AsyncMany<T> {
    try {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const { data } = await api.get<PageModel<T>>(
            `${this.url}/search?query=${query}`
          );
          resolve(data);
        }, 200);
      });
    } catch (error) {
      return {
        total: 0,
        data: [],
      };
    }
  }

  async findByID(id: number): AsyncOne<T> {
    try {
      const { data } = await api.get<T>(`${this.url}/${id}`);

      return data;
    } catch (error) {
      return { id: 0 } as T;
    }
  }

  async create(item: T): AsyncOne<T> {
    try {
      const { data } = await api.post<T>(this.url, item);
      return data;
    } catch (error) {
      return { id: 0 } as T;
    }
  }

  async update(item: T): AsyncOne<void> {
    try {
      await api.patch(`${this.url}/${item.id}`, item);
    } catch (error) {}
  }

  async remove(item: T): AsyncOne<void> {
    try {
      await api.delete(`${this.url}/${item.id}`);
    } catch (error) {}
  }
}

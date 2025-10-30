import axios from "axios";
import { makeAutoObservable } from "mobx";

const { VITE_API_URL: API_URL } = import.meta.env || {};
type Birthday = {
  name: string;
  month: string;
  day: number;
};

class BirthdayStore {
  birthdays: Birthday[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addBirthday(entry: Birthday) {
    this.birthdays.push(entry);
  }

  deleteBirthday(index: number) {
    this.birthdays.splice(index, 1);
  }

  async calculateAverage() {
    const testingBdays = [
      { month: "Nov", day: 2 },
      { month: "Dec", day: 27 }
    ];
    const response = await axios.post(`${API_URL}/average`);
    console.log("*******", { API_URL, response });
  }
}

export default new BirthdayStore();

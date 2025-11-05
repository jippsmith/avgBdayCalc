import axios from "axios";
import { makeAutoObservable } from "mobx";

const { VITE_API_URL: API_URL } = import.meta.env || {};
type Birthday = {
  name: string;
  month: string;
  day: number;
};

class BirthdayStore {
  constructor() {
    makeAutoObservable(this);
  }

  birthdays: Birthday[] = [];
  page: string = "home";

  goToHomePage = () => (this.page = "home");
  goToCalculatorPage = () => (this.page = "calculator");
  goToResultPage = () => (this.page = "result");

  addBirthday = (entry: Birthday) => {
    this.birthdays.push(entry);
  };

  deleteBirthday = (index: number) => {
    this.birthdays.splice(index, 1);
  };

  calculateAverage = async () => {
    const response = await axios.post(`${API_URL}/average`, { birthdays: this.birthdays });
    console.log("*******", { response });
  };
}

export default new BirthdayStore();

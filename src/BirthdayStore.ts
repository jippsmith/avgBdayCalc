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
  loading = false;
  birthdays: Birthday[] = [];
  page: string = "home";
  averageBirthday: Birthday = { name: "Everyone", month: "", day: 0 };

  goToHomePage = () => (this.page = "home");
  goToCalculatorPage = () => (this.page = "calculator");
  goToResultPage = () => (this.page = "results");

  reset = () => {
    this.loading = false;
    this.birthdays = [];
    this.averageBirthday = { name: "Everyone", month: "", day: 0 };
  };

  addBirthday = (entry: Birthday) => {
    this.birthdays.push(entry);
  };

  deleteBirthday = (index: number) => {
    this.birthdays.splice(index, 1);
  };

  calculateAverage = async () => {
    this.loading = true;
    try {
      const response = await axios.post(`${API_URL}/average`, { birthdays: this.birthdays });
      this.averageBirthday = response.data || {};
    } catch (err) {
      console.warn(err);
    }
    this.loading = false;
  };
}

export default new BirthdayStore();

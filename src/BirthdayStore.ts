import { makeAutoObservable } from "mobx";

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
}

export default new BirthdayStore();

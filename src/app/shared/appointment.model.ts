export interface IAppointment {
  id: string;
  name: string;
  date: string;
  type: string;
  contact: string;
  patientId: string;
}

export class Appointment implements IAppointment {
  constructor(
    public id: string,
    public name: string,
    public date: string,
    public type: string,
    public contact: string,
    public patientId: string){}

}

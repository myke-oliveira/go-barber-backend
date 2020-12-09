import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /**
   * all
   */
  public all(): Appointment[] {
    return this.appointments;
  }

  /**
   * findByDate
   */
  public findByDate(date: Date): Appointment | null {
    const findAppointmentInSameDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointmentInSameDate || null;
  }

  /**
   * create
   */
  public create({ provider, date }: Omit<Appointment, 'id'>): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

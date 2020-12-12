import Appointment from "../models/Appointment";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  /**
   * findByDate
   */
  public async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointmentInSameDate = await this.findOne({
      where: { date },
    });

    return findAppointmentInSameDate || null;
  }
}

export default AppointmentsRepository;

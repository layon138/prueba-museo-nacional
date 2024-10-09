import { AuthFakeService } from "./auth/service/auth.fake.service";
import { AuthService } from "./auth/service/auth.service";
import { VehiculeFakeService } from "./team-car/services/vehicule.fake.service";
import { VehiculeService } from "./team-car/services/vehicule.service";

export const fakeProvider=[
    {
        provide:VehiculeService,
        useClass:VehiculeFakeService
      },
      {
        provide:AuthService,
        useClass:AuthFakeService
      }
]
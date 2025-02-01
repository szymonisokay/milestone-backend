export class CreateSprintDto {
  name: string;
  goal?: string;
  startDate?: Date;
  endDate?: Date;
  projectId: string;
}

import { Account } from '@/entities/account.entity';
import { Configuration } from '@/entities/configuration.entity';
import { Project } from '@/entities/project.entity';
import { Sprint } from '@/entities/sprint.entity';
import { Task } from '@/entities/task.entity';
import { User } from '@/entities/user.entity';
import { WorkspaceMember } from '@/entities/workspace-member.entity';
import { Workspace } from '@/entities/workspace.entity';
import { MemberRoles } from '@/types/roles';

type Entities =
  | User
  | Configuration
  | Account
  | Workspace
  | WorkspaceMember
  | Project
  | Sprint
  | Task;

type SeedData = {
  entity: new () => Entities;
  data: Entities[];
}[];

const userData: User[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'john.doe@gmail.com',
    password: '$2b$10$L7XdNxhVzrW5xTHna5aOdO2dnhvEol4eXIVkqFCf.kCLJGwJnH1pm', // 'Password!123'
    workspaces: [{ id: '00000000-0000-0000-0000-000000000001' } as Workspace],
    configuration: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Configuration,
    account: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Account,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const configurationData: Configuration[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    user: {
      id: '00000000-0000-0000-0000-000000000001',
    } as User,
    workspaceId: '00000000-0000-0000-0000-000000000001',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const accountData: Account[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    user: {
      id: '00000000-0000-0000-0000-000000000001',
    } as User,
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const workspaceData: Workspace[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Workspace 1',
    owner: {
      id: '00000000-0000-0000-0000-000000000001',
    } as User,
    members: [
      { id: '00000000-0000-0000-0000-000000000001' } as WorkspaceMember,
    ],
    projects: [{ id: '00000000-0000-0000-0000-000000000001' } as Project],
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const workspaceMemberData: WorkspaceMember[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    member: {
      id: '00000000-0000-0000-0000-000000000001',
    } as User,
    workspace: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Workspace,
    role: MemberRoles.ADMIN,
    tasks: [],
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const projectData: Project[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Project 1',
    symbol: 'PR1',
    description: 'Project 1 description',
    workspace: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Workspace,
    sprints: [],
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const sprintData: Sprint[] = [
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Sprint 1',
    goal: 'Sprint 1 goal',
    isActive: false,
    isCompleted: false,
    project: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Project,
    tasks: [],
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Backlog',
    isActive: false,
    isCompleted: false,
    project: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Project,
    tasks: [
      { id: '00000000-0000-0000-0000-000000000001' } as Task,
      { id: '00000000-0000-0000-0000-000000000002' } as Task,
    ],
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

const tasksData: Task[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    identifier: 'PR1-01',
    name: 'Task 1',
    description: 'Task 1 description',
    sprint: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Sprint,
    creator: {
      id: '00000000-0000-0000-0000-000000000001',
    } as WorkspaceMember,
    assignee: {
      id: '00000000-0000-0000-0000-000000000001',
    } as WorkspaceMember,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    identifier: 'PR1-02',
    name: 'Task 2',
    description: 'Task 2 description',
    sprint: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Sprint,
    creator: {
      id: '00000000-0000-0000-0000-000000000001',
    } as WorkspaceMember,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

export const seedData: SeedData = [
  {
    entity: User,
    data: userData,
  },
  {
    entity: Configuration,
    data: configurationData,
  },
  {
    entity: Account,
    data: accountData,
  },
  {
    entity: Workspace,
    data: workspaceData,
  },
  {
    entity: WorkspaceMember,
    data: workspaceMemberData,
  },
  {
    entity: Project,
    data: projectData,
  },
  {
    entity: Sprint,
    data: sprintData,
  },
  {
    entity: Task,
    data: tasksData,
  },
];

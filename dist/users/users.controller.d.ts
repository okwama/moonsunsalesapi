import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("../entities").SalesRep>;
    findAll(): Promise<import("../entities").SalesRep[]>;
    findOne(id: string): Promise<import("../entities").SalesRep>;
    create(createUserDto: CreateUserDto): Promise<import("../entities").SalesRep>;
    update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<import("../entities").SalesRep>;
    remove(id: string): Promise<void>;
}

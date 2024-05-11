import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../enum/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  )
  {}

  canActivate(context: ExecutionContext,): boolean  {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY,[ 
      context.getHandler(),
      context.getClass(),      
    ]);

    if(!role){
      return true;
    }

    const {user} = context.switchToHttp().getRequest();
    
    return role === user.role;
  }
}

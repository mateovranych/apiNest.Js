import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enum/rol.enum';
import { Auth } from './decorators/auth.decorators';

interface RequestWithUser extends Request{

    user:{
        email:string,
        role:string,        
    }
}
@Controller('auth')
export class AuthController {

    constructor( 
        private readonly authService: AuthService,
    ){}

    //Tengo que definir el método con Post, para probarlo en el postman.
    @Post('login')
    login(@Body()loginDto:loginDto,
    ){
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body()registerDto: RegisterDto)
    {        
        return this.authService.register(registerDto);
    }


    // @Get('profile')
    // @Roles(Role.USER)
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(
    //     @Req() req: RequestWithUser){
    //     return req.user;
    //     console.log('profile')
    // }

    @Get('profile')
    @Auth(Role.ADMIN)
    profile(
        @Req() req: RequestWithUser){
        return req.user;
        console.log('profile')
    }

}


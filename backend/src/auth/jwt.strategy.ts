<<<<<<< HEAD
=======
// src/auth/jwt.strategy.ts
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  async validate(payload: any) {
<<<<<<< HEAD
    return { id: payload.sub, email: payload.email, role: payload.role };
=======
   
    console.log('JWT Payload:', payload); 
    return { 
      id: payload.sub,     
      email: payload.email,
      role: payload.role 
    };
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
  }
}
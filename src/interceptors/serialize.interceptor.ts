import { 
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors
 } from "@nestjs/common";
 import { Observable } from "rxjs";
 import { map } from "rxjs";
 import { plainToInstance } from "class-transformer";

 interface ClassConstructor {
  new (...args: any[]): {}
 }

 export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
 }

 export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

   intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
     // Run somthing before a request is handled by the request handler
     // Do something!

     return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // Do something!
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
     );
   }

 }
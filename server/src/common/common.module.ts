import { Module } from '@nestjs/common';
import { DateScalar } from './DateScalar';

@Module({
    providers: [DateScalar],
    exports: [DateScalar]
})
export class CommonModule { }

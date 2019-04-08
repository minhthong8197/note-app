import { Scalar, CustomScalar } from '@nestjs/graphql'
import { parseValue, ValueNode, Kind } from 'graphql';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number, Date>{
    description = 'Date custom scalar type'

    parseValue(value: number): Date {
        const ret = new Date(value)
        console.log('at parseValue', value, ret)
        return ret;
        // return new Date(value);
    }

    serialize(value: Date): number {
        const ret = value.getTime()
        // console.log('at serialize', value, ret)
        return ret;
    }

    parseLiteral(ast: ValueNode): Date {
        console.log('at parseLiteral', ast)
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    }
}
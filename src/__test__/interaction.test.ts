import { TezosToolkit } from '@taquito/taquito';

describe('onchain_view', () => {
    let tezos: TezosToolkit;
    let contractAddress: string
    beforeAll(() => {
        tezos = new TezosToolkit('https://ghostnet.smartpy.io');
        contractAddress = 'KT1VbfMwmBU41o1SihN9TfRgc2LvFRHgy4xy';
    })

    it('get all the field from contract (storage func)', async () => {
        const contract = await tezos.contract.at(contractAddress);
        const storage: any = await contract.storage();
        console.log(storage.x.toJSON())
        //BinNumber 객체를 반환한다. 
        //위 컨트랙에서 반환하는 storage 객체는 미켈슨으로 작성되어 있는 컨트랙트를 직렬화해서 보기 좋은 포맷으로 제공한다.
        //하지만, 정확히 어떤 객체를 반환하는 것은 해당 컨트랙트에서 스토리지에 정의된 필드 값의 종류에 의해 달라진다.
        //ex) 숫자는 bignumber.js라이브러리에서 정의된 BigNumber object를 반환한다.
        //즉, 미리 컨트랙트에서 선언해 놓은 변수들을 미리 알고 정의해야한다. 
        /**
         * s: 부호 (sign). 1은 양수, -1은 음수를 나타냅니다.
         * e: 지수 (exponent). 숫자의 크기나 스케일을 나타냅니다.
         * c: 계수 (coefficient). 실제 숫자 값을 나타냅니다.
         * x: BigNumber { s: 1, e: 1, c: [ 10 ] },
         * z: BigNumber { s: 1, e: 1, c: [ 42 ] }
         */
        //     +   "x": BigNumber {
        //     +     "_isBigNumber": true,
        //     +     "abs": [Function anonymous],
        //     +     "absoluteValue": [Function anonymous],
        //     +     "c": Array [
        //     +       10,
        //     +     ],
        //     +     "comparedTo": [Function anonymous],
        //     +     "constructor": [Function BigNumber],
        //     +     "decimalPlaces": [Function anonymous],
        //     +     "div": [Function anonymous],
        //     +     "dividedBy": [Function anonymous],
        //     +     "dividedToIntegerBy": [Function anonymous],
        //     +     "dp": [Function anonymous],
        //     +     "e": 1,
        //     +     "eq": [Function anonymous],
        //     +     "exponentiatedBy": [Function anonymous],
        //     +     "gt": [Function anonymous],
        //     +     "gte": [Function anonymous],
        //     +     "idiv": [Function anonymous],
        //     +     "integerValue": [Function anonymous],
        //     +     "isEqualTo": [Function anonymous],
        //     +     "isFinite": [Function anonymous],
        //     +     "isGreaterThan": [Function anonymous],
        //     +     "isGreaterThanOrEqualTo": [Function anonymous],
        //     +     "isInteger": [Function anonymous],
        //     +     "isLessThan": [Function anonymous],
        //     +     "isLessThanOrEqualTo": [Function anonymous],
        //     +     "isNaN": [Function anonymous],
        //     +     "isNegative": [Function anonymous],
        //     +     "isPositive": [Function anonymous],
        //     +     "isZero": [Function anonymous],
        //     +     "lt": [Function anonymous],
        //     +     "lte": [Function anonymous],
        //     +     "minus": [Function anonymous],
        //     +     "mod": [Function anonymous],
        //     +     "modulo": [Function anonymous],
        //     +     "multipliedBy": [Function anonymous],
        //     +     "negated": [Function anonymous],
        //     +     "plus": [Function anonymous],
        //     +     "pow": [Function anonymous],
        //     +     "precision": [Function anonymous],
        //     +     "s": 1,
        //     +     "sd": [Function anonymous],
        //     +     "shiftedBy": [Function anonymous],
        //     +     "sqrt": [Function anonymous],
        //     +     "squareRoot": [Function anonymous],
        //     +     "times": [Function anonymous],
        //     +     "toExponential": [Function anonymous],
        //     +     "toFixed": [Function anonymous],
        //     +     "toFormat": [Function anonymous],
        //     +     "toFraction": [Function anonymous],
        //     +     "toJSON": [Function anonymous],
        //     +     "toNumber": [Function anonymous],
        //     +     "toPrecision": [Function anonymous],
        //     +     "toString": [Function anonymous],
        //     +     "valueOf": [Function anonymous],
        //     +   }
        const result = {
            "x": "10",
            "z": "42"
        }
        /**
         * 아래에 주석을 풀면 굳이 bignumber.js를 깔지 않고 BigNumber안에 정의된 메소들의 목록을 볼 수 있다.
         */
        // expect(storage).toEqual(result);
    })

    it('contractViews', async () => {
        const contract = await tezos.contract.at(contractAddress);
        const storage: any = await contract.storage();
        console.log('Current storage:', storage);
        // code snippet of contract written by smartpy
        // @sp.onchain_view()
        // def view1(self):
        //     return sp.record(z=self.data.z, self_addr=sp.self_address())

        // @sp.onchain_view()
        // def view2(self):
        //     return self.data.z

        // @sp.onchain_view()
        // def view3(self, a):
        //     return self.data.x * a
        // console.log(contract.contractViews);
        // {
        //     view1: [Function (anonymous)],
        //     view2: [Function (anonymous)],
        //     view3: [Function (anonymous)]
        // }
    })

    it('interaction using view function', async () => {
        async function readContract(): Promise<any> {
            // 컨트랙트에 연결
            const contract = await tezos.contract.at(contractAddress);

            // 컨트랙트의 스토리지 읽기
            const storage = await contract.storage();
            console.log('Current storage:', storage);
            //s: 부호 (sign). 1은 양수, -1은 음수를 나타냅니다.
            //e: 지수 (exponent). 숫자의 크기나 스케일을 나타냅니다.
            //c: 계수 (coefficient). 실제 숫자 값을 나타냅니다.

            // // 만약 컨트랙트에 상태를 변경하지 않는 다른 함수가 있다면, 아래와 같이 호출할 수 있습니다.
            // // 예: "view2"라는 함수가 있음
            // @sp.onchain_view()
            // def view1(self):
            //     return sp.record(z=self.data.z, self_addr=sp.self_address())

            // @sp.onchain_view()
            // def view2(self):
            //     return self.data.z

            // @sp.onchain_view()
            // def view3(self, a):
            //     return self.data.x * a
            /**
            * @function executeView a view with the provided parameters.
            * @param {ExecutionContextParams} param - The parameters for executing the view.
            *   - `source` (optional): A string representing the source of the execution.
            *   - `viewCaller`: A string identifying the caller of the view.
            */
            // export interface ExecutionContextParams {
            //     source?: string;
            //     viewCaller: string;
            // }
            const viewValue = await contract.contractViews.view2().executeView({ viewCaller: 'tz1cYSgk4T76D87d5tDQnmXTDo6mCXJgKVQe' });
            console.log('view2 function result:', viewValue);
        }
        await readContract();
    })
})